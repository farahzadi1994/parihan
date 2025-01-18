import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Divider,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Rating,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { VscClose } from "react-icons/vsc";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useIsMobile } from "../../../../hook/useIsMobile";
import { useRouter } from "next/router";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import EditIcon from "@mui/icons-material/Edit";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import FastForwardIcon from "@mui/icons-material/FastForward";
import { PartMenu } from "../Video/PartMenu";
import { HttpMethod, sendRequest } from "@/utils/axios";
import Link from "next/link";
import Modal from "@/src/common/Modal";
import { VariableModal } from "../../VariableModal";

export const Words = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>({});
    const [exams, setExams] = useState<any>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [wordDetail, setWordDetail] = useState<any>();

    const matches = useIsMobile();
    const router = useRouter();

    useEffect(() => {
        setLoading(true);

        sendRequest("words/user/getAll", HttpMethod.POST, {
            session_id: router.query.slug,
            word_name: "",
            page: 1,
            count: 1000,
        })
            .then((res) => {
                setExams(res.data?.data?.words);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [router.query]);

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
                            height: "calc(100vh - 250px)",
                            overflow: "auto",
                        }}
                    >
                        <Stack mb={3} direction={"row"} alignItems={"center"}>
                            <MoreVertIcon fontSize="small" color="primary" />
                            <Typography variant="h2">
                                کلمات مرتبط با این جلسه
                            </Typography>
                        </Stack>
                        <Typography>
                            برای مشاهده جزئیات روی کلمات کلیک نمائید.
                        </Typography>
                        <Divider sx={{ mt: 1 }} />
                        <Grid container spacing={2} mt={1}>
                            {loading ? (
                                <Stack alignItems={"center"} width={"100%"}>
                                    <CircularProgress />
                                </Stack>
                            ) : (
                                exams?.map((item: any, index: number) => (
                                    <Grid item xs={12} md={6} key={index}>
                                        <Typography
                                            sx={{ cursor: "pointer" }}
                                            onClick={() => {
                                                setShowModal(true);
                                                setWordDetail(item);
                                            }}
                                        >
                                            {index + 1}. {item.word_name} :{" "}
                                            {
                                                item.word_information
                                                    .word_translate
                                            }
                                        </Typography>
                                    </Grid>
                                ))
                            )}
                        </Grid>
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
            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                containerSx={{
                    minWidth: { md: "500px", xs: "90%" },
                    background: "#fff",
                    padding: "12px 16px",
                }}
                dir="rtl"
            >
                <VariableModal data={wordDetail} setShowModal={setShowModal} />
            </Modal>
        </Grid>
    );
};
