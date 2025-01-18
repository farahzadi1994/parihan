import { Button, Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CiStar } from "react-icons/ci";
import { HttpMethod, sendRequest } from "@/utils/axios";
import { toast } from "react-toastify";

export const VariableModal = (props: {
    data: any;
    setShowModal: any;
    setReRender?: any;
}) => {
    console.log(props.data);
    const [british_link] = useState(
        new Audio(props.data?.word_information?.british_link)
    );
    const [american_link] = useState(
        new Audio(props.data?.word_information?.american_link)
    );
    const handleBritish_linkAudio = () => {
        british_link.play();
    };
    const handleAmerican_linkAudio = () => {
        american_link.play();
    };

    const changeStatus = (v: string) => {
        sendRequest("wordlearnings/user/edit", HttpMethod.POST, {
            word_id: props.data.word_id,
            word_status: v,
        }).then((res) => {
            props.setShowModal(false);
            toast.success(res.data.farsi_message);
            props.setReRender && props.setReRender((r: boolean) => !r);
        });
    };
    return (
        <Stack gap={2}>
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignContent={"center"}
            >
                <Typography fontSize={30}></Typography>
                <Typography fontSize={30}>{props.data?.word_name}</Typography>
            </Stack>
            <Divider />
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignContent={"center"}
            >
                <Stack direction={"row"} alignContent={"center"} gap={1}>
                    <InsertPhotoIcon fontSize="small" color="warning" />
                    <Typography variant="caption" color={"#6a6a6a"}>
                        تصویر مربوط به کلمه
                    </Typography>
                </Stack>
                <img
                    src={props.data?.word_information?.word_image}
                    style={{ borderRadius: 10 }}
                    width={"200px"}
                />
            </Stack>
            <Divider />
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignContent={"center"}
            >
                <Stack direction={"row"} alignContent={"center"} gap={1}>
                    <HeadphonesIcon fontSize="small" color="warning" />
                    <Typography variant="caption" color={"#6a6a6a"}>
                        تلفظ کلمه
                    </Typography>
                </Stack>
                <Stack gap={1} pt={3}>
                    <Stack
                        direction={"row"}
                        alignContent={"center"}
                        gap={1}
                        justifyContent={"end"}
                    >
                        <GraphicEqIcon
                            fontSize="small"
                            color="warning"
                            onClick={handleBritish_linkAudio}
                        />
                        <Typography fontFamily={"mr-eaves-modern"}>
                            British Pronunciation
                        </Typography>
                    </Stack>
                    <Stack
                        direction={"row"}
                        alignContent={"center"}
                        gap={1}
                        justifyContent={"end"}
                    >
                        <GraphicEqIcon
                            fontSize="small"
                            color="warning"
                            onClick={handleAmerican_linkAudio}
                        />
                        <Typography fontFamily={"mr-eaves-modern"}>
                            American Pronunciation
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Divider />
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignContent={"center"}
            >
                <Stack direction={"row"} alignContent={"center"} gap={1}>
                    <FormatQuoteIcon fontSize="small" color="warning" />
                    <Typography variant="caption" color={"#6a6a6a"}>
                        مثال
                    </Typography>
                </Stack>
                <Stack gap={1} pt={3}>
                    <Typography
                        fontFamily={"mr-eaves-modern"}
                        textAlign={"right"}
                    >
                        {props.data?.word_information?.first_example}
                    </Typography>
                    <Typography fontSize={13}>
                        {props.data?.word_information?.first_example_translate}
                    </Typography>
                </Stack>
            </Stack>
            <Divider />
            <Stack justifyContent={"space-between"} alignContent={"center"}>
                <Stack direction={"row"} alignContent={"center"} gap={1}>
                    <Typography variant="caption" color={"#6a6a6a"}>
                        سطح پیچیدگی کلمه برای شما
                    </Typography>
                    <InfoIcon fontSize="small" color="warning" />
                </Stack>
                <Stack gap={1} direction={"row"} pt={3}>
                    <Button
                        variant={
                            props.data.word_status === "easy"
                                ? "contained"
                                : "outlined"
                        }
                        onClick={() => changeStatus("easy")}
                    >
                        <Stack
                            direction={"row"}
                            alignContent={"center"}
                            gap={1}
                        >
                            <Typography>ساده بود</Typography>
                            <CheckCircleIcon sx={{ fontSize: "18px" }} />
                        </Stack>
                    </Button>
                    <Button
                        variant={
                            props.data.word_status === "normal"
                                ? "contained"
                                : "outlined"
                        }
                        onClick={() => changeStatus("normal")}
                    >
                        <Stack
                            direction={"row"}
                            alignContent={"center"}
                            gap={1}
                        >
                            <Typography>متوسط بود</Typography>
                            <CheckCircleIcon sx={{ fontSize: "18px" }} />
                        </Stack>
                    </Button>
                    <Button
                        variant={
                            props.data.word_status === "hard"
                                ? "contained"
                                : "outlined"
                        }
                        onClick={() => changeStatus("hard")}
                    >
                        <Stack
                            direction={"row"}
                            alignContent={"center"}
                            gap={1}
                        >
                            <Typography>سخت بود</Typography>
                            <CheckCircleIcon sx={{ fontSize: "18px" }} />
                        </Stack>
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
};
