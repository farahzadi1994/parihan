import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Divider,
    Drawer,
    Grid,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Rating,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { VscClose } from "react-icons/vsc";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useIsMobile } from "../../../../hook/useIsMobile";
import { PartMenu } from "./PartMenu";
import { useRouter } from "next/router";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import EditIcon from "@mui/icons-material/Edit";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import FastForwardIcon from "@mui/icons-material/FastForward";
import { HttpMethod, sendRequest } from "@/utils/axios";
import { profile } from "console";
import { useDashboard } from "@/src/layout/DashboardContext";
import { WistiaPlayer } from "@wistia/wistia-player-react";
import WistiaEmbed from "./WistiaEmbed";
import WistiaVideo from "./WistiaEmbed";

interface WatermarkPosition {
    top: string;
    left: string;
}

export const Video = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>({});
    const [exams, setExams] = useState<any>({});
    const [next, setNext] = useState<string>("");
    const matches = useIsMobile();
    const router = useRouter();
    const { profile, sessions } = useDashboard();
    const [position, setPosition] = useState<WatermarkPosition>({
        top: "10px",
        left: "10px",
    });
    const [isVisible, setIsVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // غیرفعال کردن کلیک راست
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        // غیرفعال کردن میانبرهای صفحه کلید (مثل Ctrl+S و Ctrl+U)
        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                e.ctrlKey &&
                (e.key === "s" || e.key === "u" || e.key === "Shift")
            ) {
                e.preventDefault();
            }
        };

        // اضافه کردن رویدادها به کل صفحه
        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isPlaying) {
            interval = setInterval(() => {
                const randomTop = `${Math.floor(Math.random() * 80)}%`;
                const randomLeft = `${Math.floor(Math.random() * 80)}%`;
                setPosition({ top: randomTop, left: randomLeft });

                setIsVisible(true);
                setTimeout(() => {
                    setIsVisible(false);
                }, 5000);
            }, 7000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isPlaying]);

    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
        setIsVisible(false); // محو شدن واترمارک هنگام توقف ویدیو
    };

    useEffect(() => {
        setLoading(true);

        sendRequest("exam/guest/getAll", HttpMethod.POST, {
            session_id: router.query.slug,
            exam_name: "",
            page: 1,
            count: 1000,
        }).then((res) => {
            setExams(res.data?.data);
        });

        if (sessions) {
            setData(
                sessions.filter(
                    (item: any) => item.session_id == router.query.slug
                )[0]
            );
            findNextSession(router.query.slug, sessions);
            setLoading(false);
        }
    }, [router.query, sessions]);

    const findNextSession = (current: any, all: any) => {
        const temp = all.slice()?.reverse();

        temp.map((item: any, index: number = 0) => {
            if (item.session_id == current) {
                console.log(temp[index + 1]?.session_id);

                if (temp[index + 1]) setNext(temp[index + 1].session_id);
            }
        });
    };

    const isRtl = (text: string) => {
        const rtlChar = /[\u0600-\u06FF]/;
        return rtlChar.test(text);
    };

    return (
        <Grid container minHeight="calc(100vh - 250px)">
            {matches && (
                <Button
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 3 }}
                    startIcon={<BsFillMenuButtonWideFill />}
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    منو آموزشی
                </Button>
            )}
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                sx={{ ".MuiDrawer-paper": { width: "100%" } }}
                anchor="right"
            >
                <Box
                    sx={{
                        background: "#e0d0c3",
                        padding: "15px",
                        height: "100%",
                    }}
                >
                    <Box
                        sx={{
                            background: "#fff",
                            padding: "15px",
                            boxShadow: 3,
                            borderRadius: "30px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            position: "relative",
                            transition: "width 0.4s",
                            height: "100%",
                        }}
                    >
                        <Stack>
                            <Stack
                                direction={"row"}
                                justifyContent={"space-between"}
                                alignItems={"start"}
                            >
                                <img src="/images/logo.svg" width={"140px"} />
                                <VscClose
                                    size={50}
                                    color="#751A29"
                                    cursor={"pointer"}
                                    onClick={() => setOpen(false)}
                                />
                            </Stack>

                            <Divider sx={{ height: "1px", width: "100%" }} />

                            <PartMenu open={open} setOpen={setOpen} />
                        </Stack>
                    </Box>
                </Box>
            </Drawer>
            <Grid item md={7.8} xs={12}>
                <Stack gap={3}>
                    <Box
                        sx={{
                            background: "#FFF",
                            p: "20px 25px",
                            borderRadius: "20px 20px 20px 20px",
                            position: "relative",
                            border: "1px solid #751A298F",
                        }}
                    >
                        {loading ? (
                            <Stack
                                alignItems={"center"}
                                width={"100%"}
                                minHeight="calc(100vh - 300px)"
                            >
                                <CircularProgress />
                            </Stack>
                        ) : (
                            <>
                                <Stack
                                    mb={3}
                                    direction={"row"}
                                    alignItems={"center"}
                                >
                                    <MoreVertIcon
                                        fontSize="small"
                                        color="primary"
                                    />
                                    <Typography variant="h2">
                                        {data?.session_name}:{" "}
                                        {
                                            data?.session_information
                                                ?.session_subject
                                        }
                                    </Typography>
                                </Stack>
                                {data?.session_information?.video_link && (
                                    <div>
                                        <WistiaVideo
                                            videoId={
                                                data?.session_information
                                                    ?.video_link
                                            }
                                            title={profile?.phone_number}
                                        />
                                    </div>
                                )}
                                <Divider sx={{ mt: 1 }} />
                                <Stack
                                    direction={matches ? "column" : "row"}
                                    justifyContent={"space-between"}
                                >
                                    <Stack gap={1} mt={1}>
                                        <Stack direction={"row"} gap={1}>
                                            <MenuBookIcon color="secondary" />
                                            <Typography>
                                                {
                                                    data?.session_information
                                                        ?.session_subject
                                                }
                                            </Typography>
                                        </Stack>
                                        <Stack direction={"row"} gap={1}>
                                            <BookmarksIcon color="secondary" />
                                            <Typography>
                                                سطح{" "}
                                                {
                                                    data?.session_information
                                                        ?.session_level
                                                }
                                            </Typography>
                                        </Stack>
                                        {/* <Stack direction={"row"} gap={1}>
                                            <EditIcon color="secondary" />
                                            <Typography>
                                                شامل {exams?.all_exam} تست{" "}
                                            </Typography>
                                        </Stack> */}
                                        <Stack direction={"row"} gap={1}>
                                            <MilitaryTechIcon color="secondary" />
                                            <Typography>۲۰ امتیاز</Typography>
                                        </Stack>
                                    </Stack>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size="large"
                                        endIcon={<FastForwardIcon />}
                                        onClick={() => {
                                            router.push(
                                                `/dashboard/courses/general-course/${next}/video`
                                            );
                                        }}
                                        sx={{
                                            width: 150,
                                            height: "fit-content",
                                            mt: 4,
                                        }}
                                    >
                                        جلسه بعدی
                                    </Button>
                                </Stack>
                                <Divider sx={{ m: "10px 0" }} />
                                <Typography
                                    fontSize={15}
                                    align={
                                        isRtl(
                                            data?.session_information
                                                ?.session_description
                                        )
                                            ? "right"
                                            : "left"
                                    }
                                >
                                    {
                                        data?.session_information
                                            ?.session_description
                                    }
                                </Typography>
                            </>
                        )}
                    </Box>
                </Stack>
            </Grid>
            <Grid item md={0.2} xs={12}></Grid>
            {!matches && (
                <Grid item md={4} xs={12}>
                    <Stack
                        sx={{
                            background: "#E1D0C3",
                            p: "20px 25px",
                            borderRadius: "20px 20px 20px 20px",
                            position: "relative",
                            height: "100%",
                        }}
                        gap={8}
                    >
                        <PartMenu open={open} setOpen={setOpen} />
                    </Stack>
                </Grid>
            )}
        </Grid>
    );
};
