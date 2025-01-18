import {
    Box,
    Button,
    CircularProgress,
    Divider,
    Drawer,
    FormControl,
    FormLabel,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    RadioGroup,
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
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Modal from "../../../common/Modal";
import { VariableModal } from "../VariableModal";
import { HttpMethod, sendRequest } from "@/utils/axios";
import { toast } from "react-toastify";
import { useDashboard } from "@/src/layout/DashboardContext";

export const SingleArticle = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [answers, setAnswers] = useState<any>({});
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>({});
    const [quiz, setQuiz] = useState<any>([]);
    const matches = useIsMobile();
    const router = useRouter();
    const { profile } = useDashboard();
    const handleRadioChange = (event: any) => {
        const { name, value } = event.target;
        setAnswers((prevAnswers: any) => ({
            ...prevAnswers,
            [name]: value,
        }));
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const incorrectAnswers: any = [];
        const formData = new FormData(event.target);
        const answers: any = {};

        quiz.forEach((item: any) => {
            const questionId = `${item.articlequestion_id}`;
            answers[questionId] = formData.get(questionId);
        });

        quiz.forEach((question: any, index: number) => {
            const questionId = question.articlequestion_id;
            const correctAnswer =
                question.articlequestion_information.correct_answer;
            const userAnswer = answers[questionId];

            if (userAnswer !== correctAnswer) {
                toast.error(`جواب سوال  ${index + 1} اشتباه است `);
                incorrectAnswers.push({
                    question: question.articlequestion_name,
                    questionNumber: index + 1,
                    userAnswer,
                    correctAnswer,
                });
            }
        });

        if (incorrectAnswers.length == 0) {
            sendRequest("transactions/user/submitArticle", HttpMethod.POST, {
                article_id: router.query.slug,
            }).then((res) => {
                toast.success(res.data.farsi_message);
                router.push("/dashboard/courses/article");
            });
        }
    };

    useEffect(() => {
        setLoading(true);
        sendRequest("articles/guest/get_one", HttpMethod.POST, {
            article_id: router.query.slug,
        }).then((res) => {
            setData(res.data?.data?.articles);
        });
        sendRequest("articlequestion/guest/getAll", HttpMethod.POST, {
            article_id: router.query.slug,
            articlequestion_name: "",
            page: 1,
            count: 1000,
        })
            .then((res) => {
                setQuiz(res.data.data.articlequestion);
                setAnswers;
            })
            .finally(() => setLoading(false));
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
                        {/* <Stack direction={"row"} alignItems={"center"}>
                            <MoreVertIcon fontSize="small" color="primary" />
                            <Typography variant="h2">
                                لیست مقالات | مقاله شماره 1
                            </Typography>
                            </Stack> */}
                        {/* <Divider sx={{ borderColor: "#751A298F", mt: 2 }} /> */}
                        {loading ? (
                            <Box
                                sx={{
                                    minHeight: "calc(100vh - 300px)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                }}
                            >
                                <CircularProgress
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignContent: "center",
                                    }}
                                />
                            </Box>
                        ) : (
                            <Stack
                                alignItems={"end"}
                                mt={2}
                                sx={{
                                    maxHeight: "calc(100vh - 300px)",
                                    overflow: "auto",
                                    pr: "20px",
                                }}
                            >
                                <Stack
                                    direction={"row"}
                                    gap={1}
                                    alignItems={"center"}
                                >
                                    <Typography
                                        fontFamily={"mr-eaves-modern"}
                                        fontSize={28}
                                    >
                                        {data?.article_name}
                                    </Typography>
                                    <QuizOutlinedIcon color="secondary" />
                                </Stack>
                                <Typography
                                    fontFamily={"mr-eaves-modern"}
                                    textAlign={"right"}
                                >
                                    {data?.article_information?.article_text}
                                </Typography>
                                <Stack
                                    direction={"row"}
                                    gap={1}
                                    textAlign={"left"}
                                    justifyContent={"start"}
                                    width={"100%"}
                                    mt={3}
                                    sx={{
                                        background: "#d9d9d94a",
                                        p: "10px 20px",
                                    }}
                                >
                                    <DriveFileRenameOutlineIcon color="primary" />
                                    <Typography>
                                        پس از مطالعه متن بالا به سوالات زیر پاسخ
                                        دهید.
                                    </Typography>
                                </Stack>

                                <form
                                    style={{ width: "100%" }}
                                    dir="ltr"
                                    onSubmit={handleSubmit}
                                >
                                    <FormControl
                                        sx={{ width: "100%" }}
                                        variant="standard"
                                    >
                                        {quiz.map(
                                            (item: any, index: number) => {
                                                const questionId = `${item.articlequestion_id}`;
                                                const options = [
                                                    {
                                                        value: `${item?.articlequestion_information?.wrong_answer_1}`,
                                                        label: item
                                                            ?.articlequestion_information
                                                            ?.wrong_answer_1,
                                                    },
                                                    {
                                                        value: item
                                                            ?.articlequestion_information
                                                            ?.wrong_answer_2,
                                                        label: item
                                                            ?.articlequestion_information
                                                            ?.wrong_answer_2,
                                                    },
                                                    {
                                                        value: item
                                                            ?.articlequestion_information
                                                            ?.wrong_answer_3,
                                                        label: item
                                                            ?.articlequestion_information
                                                            ?.wrong_answer_3,
                                                    },
                                                    {
                                                        value: item
                                                            ?.articlequestion_information
                                                            ?.correct_answer,
                                                        label: item
                                                            ?.articlequestion_information
                                                            ?.correct_answer,
                                                    },
                                                ];
                                                const shuffledOptions =
                                                    options.sort(
                                                        () =>
                                                            Math.random() - 0.5
                                                    );

                                                return (
                                                    <React.Fragment key={index}>
                                                        <FormLabel
                                                            id={`question-label-${index}`}
                                                            sx={{ mt: 3 }}
                                                        >
                                                            {`${index + 1}. ${
                                                                item.articlequestion_name
                                                            }`}
                                                        </FormLabel>

                                                        <RadioGroup
                                                            aria-labelledby={`question-label-${index}`}
                                                            name={questionId}
                                                        >
                                                            <Grid container>
                                                                {shuffledOptions.map(
                                                                    (
                                                                        option,
                                                                        idx
                                                                    ) => (
                                                                        <Grid
                                                                            item
                                                                            md={
                                                                                6
                                                                            }
                                                                            xs={
                                                                                12
                                                                            }
                                                                            key={
                                                                                idx
                                                                            }
                                                                        >
                                                                            <FormControlLabel
                                                                                value={
                                                                                    option.value
                                                                                }
                                                                                control={
                                                                                    <Radio />
                                                                                }
                                                                                label={
                                                                                    option.label
                                                                                }
                                                                            />
                                                                        </Grid>
                                                                    )
                                                                )}
                                                            </Grid>
                                                        </RadioGroup>
                                                    </React.Fragment>
                                                );
                                            }
                                        )}

                                        <Divider />
                                        <Stack alignItems={"end"}>
                                            <Button
                                                sx={{ mt: 2, mr: 1 }}
                                                type="submit"
                                                variant="contained"
                                            >
                                                ثبت پاسخ ها
                                            </Button>
                                        </Stack>
                                    </FormControl>
                                </form>
                            </Stack>
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
                        <Menu open={open} setOpen={setOpen} />
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
                <></>
                {/* <VariableModal
                    data={{}}
                    setShowModal={setShowModal}
                    // setReRender={setReRender}
                /> */}
            </Modal>
        </Grid>
    );
};
