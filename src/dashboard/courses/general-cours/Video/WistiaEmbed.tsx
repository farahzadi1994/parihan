import React, { useState, useEffect, useRef } from "react";
import { WistiaPlayer } from "@wistia/wistia-player-react";
import { IconButton } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

interface WistiaVideoProps {
    videoId: string;
    title: string;
}

const WistiaVideo: React.FC<WistiaVideoProps> = ({ videoId, title }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [titlePosition, setTitlePosition] = useState({
        top: "10%",
        left: "50%",
    });
    const [fade, setFade] = useState(false);
    const videoContainerRef = useRef<HTMLDivElement | null>(null);
    const [isIPhone, setIsIPhone] = useState(false);

    const playerRef = useRef<any>(null);

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    const getRandomPosition = () => {
        const randomTop = `${Math.floor(Math.random() * 80)}%`;
        const randomLeft = `${Math.floor(Math.random() * 100)}%`;
        return { top: randomTop, left: randomLeft };
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true);
            setTimeout(() => {
                setTitlePosition(getRandomPosition());
                setFade(false);
            }, 500);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const resizeVideo = () => {
        if (videoContainerRef.current) {
            videoContainerRef.current.style.width = "100%";
            videoContainerRef.current.style.height = "auto";
        }
    };

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor;
        if (/iPhone/i.test(userAgent)) {
            setIsIPhone(true);
        }
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            // بررسی حالت فول اسکرین برای مرورگرهای مختلف
            const isCurrentlyFullscreen =
                !!document.fullscreenElement ||
                !!document.webkitFullscreenElement;

            setIsFullscreen(isCurrentlyFullscreen);
        };

        // اضافه کردن لیسنرها برای تغییر حالت فول اسکرین
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener(
            "webkitfullscreenchange",
            handleFullscreenChange
        ); // Safari-specific

        // حذف لیسنرها در زمان تخریب کامپوننت
        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
            document.removeEventListener(
                "webkitfullscreenchange",
                handleFullscreenChange
            );
        };
    }, []);

    const toggleFullscreen = () => {
        if (isIPhone) {
            // Manual fullscreen for iPhone

            setIsFullscreen(!isFullscreen);
        } else if (videoContainerRef.current) {
            // Standard fullscreen for other devices
            const element = videoContainerRef.current as any;
            if (!isFullscreen) {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen(); // Safari
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen(); // Firefox
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen(); // IE/Edge
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if ((document as any).webkitExitFullscreen) {
                    (document as any).webkitExitFullscreen(); // Safari
                } else if ((document as any).mozCancelFullScreen) {
                    (document as any).mozCancelFullScreen(); // Firefox
                } else if ((document as any).msExitFullscreen) {
                    (document as any).msExitFullscreen(); // IE/Edge
                }
            }
        }
    };

    return (
        <div
            ref={videoContainerRef}
            style={{
                position: isFullscreen && isIPhone ? "fixed" : "relative",
                top: isFullscreen && isIPhone ? 0 : "unset",
                left: isFullscreen && isIPhone ? 0 : "unset",
                width: isFullscreen && isIPhone ? "100vw" : "100%",
                height: isFullscreen && isIPhone ? "100vh" : "auto",
                zIndex: isFullscreen && isIPhone ? 1000 : "unset",
                backgroundColor: isFullscreen && isIPhone ? "#000" : "unset",
            }}
        >
            {isPlaying && (
                <div
                    style={{
                        position: "absolute",
                        top: titlePosition.top,
                        left: titlePosition.left,
                        transform: "translateX(-50%)",
                        color: "#000",
                        fontSize: "14px",
                        zIndex: 10,
                        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
                        opacity: fade ? 0 : 0.6,
                        transition: "opacity 0.5s ease-in-out",
                        background: "#e2e2e2",
                        padding: "2px 5px",
                        borderRadius: "6px",
                    }}
                >
                    {title}
                </div>
            )}

            <WistiaPlayer
                mediaId={videoId}
                onPlay={handlePlay}
                onPause={handlePause}
                ref={playerRef}
                style={{ width: "100%", height: "100%" }}
                fullscreenControl={false}
            />

            <IconButton
                onClick={() => {
                    toggleFullscreen();
                }}
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "#fff",
                    color: "#000",
                    zIndex: 20,
                }}
            >
                {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
        </div>
    );
};

export default WistiaVideo;
