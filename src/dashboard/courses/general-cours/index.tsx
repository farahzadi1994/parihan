import {
    Avatar,
    Box,
    Button,
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
import React, { useEffect, useState } from "react";
import { useIsMobile } from "../../../hook/useIsMobile";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { VscClose } from "react-icons/vsc";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CourseMenu } from "./CoursMenu";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import EditAttributesIcon from "@mui/icons-material/EditAttributes";
import { useRouter } from "next/router";
import { HttpMethod, sendRequest } from "@/utils/axios";
import { useDashboard } from "@/src/layout/DashboardContext";
import WistiaVideo from "./Video/WistiaEmbed";

export const GeneralCours = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<any>({});
    const [first, setFirst] = useState<any>({});
    const matches = useIsMobile();
    const router = useRouter();
    const { profile, sessions } = useDashboard();

    useEffect(() => {
        sendRequest("courses/guest/getAll", HttpMethod.POST, {
            course_name: "",
            page: 1,
            count: 1,
        }).then((res) => {
            
            setData(res.data.data.courses[0]);
        });
    }, []);

    useEffect(() => {
        if (sessions) setFirst(sessions.slice().reverse()[0].session_id);
    }, [sessions]);

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
                    لیست جلسات
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

                            <CourseMenu />
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
                        <Stack mb={3} direction={"row"} alignItems={"center"}>
                            <MoreVertIcon fontSize="small" color="primary" />
                            <Typography variant="h2">
                                در این دوره چه چیزهایی رو یاد خواهید گرفت
                            </Typography>
                        </Stack>
                        <Grid container spacing={[4, 4]}>
                            <Grid item md={8} xs={12}>
                                <div id="container">
                                    
                                       <div>
                                            <WistiaVideo
                                                videoId={
                                                    'v7ck9aoib3'
                                                }
                                                title={profile?.phone_number}
                                            />
                                        </div>
                                    
                                </div>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <Stack
                                    justifyContent={"space-between"}
                                    height={"90%"}
                                >
                                    <Stack gap={1} mt={1}>
                                        <Stack direction={"row"} gap={1}>
                                            <NewspaperOutlinedIcon color="secondary" />
                                            <Typography>
                                                {
                                                    data?.course_information
                                                        ?.total_sessions
                                                }{" "}
                                                جلسه
                                            </Typography>
                                        </Stack>
                                        <Stack direction={"row"} gap={1}>
                                            <QuizOutlinedIcon color="secondary" />
                                            <Typography>
                                                {
                                                    data?.course_information
                                                        ?.total_duration
                                                }{" "}
                                                ویدیو آموزشی
                                            </Typography>
                                        </Stack>
                                        <Stack direction={"row"} gap={1}>
                                            <NewspaperOutlinedIcon color="secondary" />
                                            <Typography>
                                                کلمات هر درس با آموزش
                                            </Typography>
                                        </Stack>
                                        {profile?.is_enrolled !== 1 && (
                                            <Stack direction={"row"} gap={1}>
                                                <NewspaperOutlinedIcon color="secondary" />
                                                <Typography>
                                                    تست های هر درس
                                                </Typography>
                                            </Stack>
                                        )}
                                        {profile?.is_enrolled !== 1 && (
                                            <Stack direction={"row"} gap={1}>
                                                <NewspaperOutlinedIcon color="secondary" />
                                                <Typography>
                                                    تست های گرامری
                                                </Typography>
                                            </Stack>
                                        )}
                                    </Stack>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size="large"
                                        endIcon={<PlayCircleIcon />}
                                        onClick={() => {
                                            router.push(
                                                `/dashboard/courses/general-course/${first}/video`
                                            );
                                        }}
                                    >
                                        شروع دوره
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Divider sx={{ height: "1px", width: "100%", mt: 1 }} />
                        <Typography lineHeight={1.8} mt={1} fontSize={15}>
                            قراره قدم به قدم همراه هم پیش برویم تا در زبان
                            انگلیسی کاملا مسلط بشویم.
                            <br /> بیایید و در این لحظه تعهدی به من و خودتان
                            بدهید. تعهد بدهید که از همین ابتدا استمرار داشته
                            باشید در این راه، تعهد بدهید که تا رسیدن به هدفتان
                            دست برندارید از دیدن آموزش ها و تمرین کردن.
                            <br /> من تا آخر مسیر که شما تسلط کافی پیدا کنید در
                            زبان انگلیسی همراهتان هستم، اگر آموزش هارو کامل
                            دیدید و تمرینات خود را انجام دادید و باز هم به
                            هدفتان نرسیدید کافیه به من ایمیل بزنید یا با آکادمی
                            پریحان تماس بگیرید!
                            <br /> من تمام قد کنار شما هستم و تا شما را به
                            هدفتان نرسانم دست شما را رها نخواهم کرد.
                            <br /> حالا که تعهد دادید، برویم که پر قدرت باهم
                            شروع کنیم!
                            <br /> "الهی به امید تو"
                        </Typography>
                        {/* <List>
                            <ListItem disablePadding>
                                <ListItemIcon sx={{ minWidth: 35 }}>
                                    <EditAttributesIcon color="secondary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        data?.course_information?.what_learn_1
                                    }
                                />
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemIcon sx={{ minWidth: 35 }}>
                                    <EditAttributesIcon color="secondary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        data?.course_information?.what_learn_2
                                    }
                                ></ListItemText>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemIcon sx={{ minWidth: 35 }}>
                                    <EditAttributesIcon color="secondary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        data?.course_information?.what_learn_3
                                    }
                                />
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemIcon sx={{ minWidth: 35 }}>
                                    <EditAttributesIcon color="secondary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        data?.course_information?.what_learn_4
                                    }
                                />
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemIcon sx={{ minWidth: 35 }}>
                                    <EditAttributesIcon color="secondary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        data?.course_information?.what_learn_5
                                    }
                                />
                            </ListItem>
                        </List> */}
                    </Box>
                    {/* <Box
                        sx={{
                            background: "#FFF",
                            p: "20px 25px",
                            borderRadius: "20px 20px 20px 20px",
                            position: "relative",
                            border: "1px solid #751A298F",
                        }}
                    >
                        <Stack mb={3} direction={"row"} alignItems={"center"}>
                            <MoreVertIcon fontSize="small" color="primary" />
                            <Typography variant="h2">مدرس دوره</Typography>
                        </Stack>
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Stack direction={"row"} gap={2}>
                                <Avatar
                                    src="/images/rohani.png"
                                    alt="author image"
                                    sx={{ width: "80px", height: "80px" }}
                                />
                                <Stack gap={0} justifyContent={"space-evenly"}>
                                    <Typography fontSize={18}>
                                        {
                                            data?.instructor_id_information
                                                ?.instructor_name
                                        }
                                    </Typography>
                                    <Rating
                                        name="read-only"
                                        value={5}
                                        readOnly
                                    />
                                </Stack>
                            </Stack>
                            <Link
                                href="#"
                                variant="body2"
                                fontSize={"20px"}
                                align="center"
                                display={"block"}
                                height={"100%"}
                            >
                                مشاهده پروفایل مدرس
                            </Link>
                        </Stack>
                    </Box> */}
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
                        <Stack
                            sx={{
                                background: "#fff",
                                borderRadius: "20px",
                                p: "20px 20px",
                                border: "1px solid #751A298F",
                            }}
                            gap={3}
                        >
                            <CourseMenu />
                        </Stack>
                    </Stack>
                </Grid>
            )}
        </Grid>
    );
};
