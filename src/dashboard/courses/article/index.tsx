import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Divider,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useIsMobile } from "../../../hook/useIsMobile";
import { useRouter } from "next/router";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { VscClose } from "react-icons/vsc";
import { FaBook, FaEye, FaSpellCheck, FaFileAlt } from "react-icons/fa";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu } from "../Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import CheckIcon from "@mui/icons-material/Check";
import LockIcon from "@mui/icons-material/Lock";
import { HttpMethod, sendRequest } from "@/utils/axios";
import { useDashboard } from "@/src/layout/DashboardContext";

export const Article = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<any>([]);
    const [allCount, setAllCount] = useState<number>(116);
    const matches = useIsMobile();
    const router = useRouter();
    const { profile, loading } = useDashboard();
    useEffect(() => {
        sendRequest("articles/guest/getAll", HttpMethod.POST, {
            article_name: "",
            page: 1,
            count: 1000,
        }).then((res) => {
            setAllCount(res.data.data.all_articles);
            setData(res.data.data.articles);
        });
    }, []);
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
                sx={{
                    ".muirtl-4t3x6l-MuiPaper-root-MuiDrawer-paper": {
                        width: "100%",
                    },
                }}
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

                            <List
                                sx={{
                                    width: "100%",
                                    "& .Mui-selected": {
                                        color: "#fff !important",
                                        background:
                                            "rgb(117, 26, 41) !important",
                                        borderRadius: "10px",
                                    },
                                    "& .Mui-selected:hover": {
                                        background: "rgb(117, 26, 41)",
                                    },
                                    "& svg": {
                                        color: "#d1c5bb",
                                    },
                                    ".muirtl-66vpte-MuiButtonBase-root-MuiListItemButton-root:hover":
                                        {
                                            borderRadius: "10px",
                                        },
                                    "& .MuiListItemButton-root": {
                                        borderRadius: "10px",
                                    },
                                }}
                            >
                                <ListItem disableGutters>
                                    <ListItemButton
                                        selected={
                                            router.pathname.split("/").length ==
                                                3 &&
                                            router.pathname.includes("courses")
                                        }
                                        onClick={(event) =>
                                            router.push("/dashboard/courses")
                                        }
                                    >
                                        <ListItemIcon>
                                            <FaBook />
                                        </ListItemIcon>
                                        <ListItemText primary="دوره‌های آموزشی من" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disableGutters>
                                    <ListItemButton
                                        selected={router.pathname.includes(
                                            "seen-lessons"
                                        )}
                                        onClick={(event) =>
                                            router.push(
                                                "/dashboard/courses/seen-lessons"
                                            )
                                        }
                                    >
                                        <ListItemIcon>
                                            <FaEye />
                                        </ListItemIcon>
                                        {
                                            <ListItemText primary="درس های دیده شده" />
                                        }
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disableGutters>
                                    <ListItemButton
                                        selected={router.pathname.includes(
                                            "seen-words"
                                        )}
                                        onClick={(event) =>
                                            router.push(
                                                "/dashboard/courses/seen-words"
                                            )
                                        }
                                    >
                                        <ListItemIcon>
                                            <FaSpellCheck />
                                        </ListItemIcon>
                                        {
                                            <ListItemText primary="کلمات درس های دیده شده" />
                                        }
                                    </ListItemButton>
                                </ListItem>

                                {profile?.is_enrolled === 3 && (
                                    <ListItem disableGutters>
                                        <ListItemButton
                                            selected={router.pathname.includes(
                                                "article"
                                            )}
                                            onClick={() =>
                                                router.push(
                                                    "/dashboard/courses/article"
                                                )
                                            }
                                        >
                                            <ListItemIcon>
                                                <FaFileAlt />
                                            </ListItemIcon>
                                            {
                                                <ListItemText primary="مقالات انگلیسی" />
                                            }
                                        </ListItemButton>
                                    </ListItem>
                                )}
                            </List>
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
                        <Stack direction={"row"} alignItems={"center"}>
                            <MoreVertIcon fontSize="small" color="primary" />
                            <Typography variant="h2">مقالات انگلیسی</Typography>
                        </Stack>
                        <div style={{ marginTop: 20 }}>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    این بخش شامل چه مواردی می شود
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Stack gap={2}>
                                        <Stack gap={1} mt={1}>
                                            <Stack direction={"row"} gap={1}>
                                                <NewspaperOutlinedIcon color="secondary" />
                                                <Typography>
                                                    {allCount} مقاله انگلیسی
                                                </Typography>
                                            </Stack>
                                            <Stack direction={"row"} gap={1}>
                                                <QuizOutlinedIcon color="secondary" />
                                                <Typography>
                                                    هر مقاله شامل تست های 4
                                                    گزینه ای می باشد
                                                </Typography>
                                            </Stack>
                                            <Stack direction={"row"} gap={1}>
                                                <NewspaperOutlinedIcon color="secondary" />
                                                <Typography>
                                                    20 paricoin برای مطالعه و
                                                    انجام تست هر مقاله
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Typography>
                                            Parihan English این مقالات را برای
                                            تقویت بیشتر زبان شما طراحی نموده
                                            است، لطفا به عنوان بخشی از تمرینات
                                            روزانه خود این مقالات را مطالعه و
                                            تمرینات آنها را انجام دهید.
                                        </Typography>
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    لیست مقالات
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List
                                        sx={{
                                            width: "100%",
                                            bgcolor: "background.paper",
                                            direction: "rtl",
                                            "& .MuiListItemText-root": {
                                                textAlign: "right",
                                            },
                                            maxHeight: "calc(100vh - 700px)",
                                            overflow: "auto",
                                        }}
                                        aria-label="contacts"
                                    >
                                        {data.map(
                                            (item: any, index: number) => (
                                                <ListItem
                                                    disablePadding
                                                    key={index}
                                                >
                                                    <ListItemButton
                                                        onClick={() =>
                                                            router.push(
                                                                "/dashboard/courses/article/" +
                                                                    item.article_id
                                                            )
                                                        }
                                                    >
                                                        <ListItemIcon>
                                                            <CheckIcon color="primary" />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={
                                                                item.article_name
                                                            }
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                            )
                                        )}
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        </div>
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
                        <Menu open={open} setOpen={setOpen} />
                    </Stack>
                </Grid>
            )}
        </Grid>
    );
};
