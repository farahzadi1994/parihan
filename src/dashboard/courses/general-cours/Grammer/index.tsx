import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Divider,
    Drawer,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    RadioGroup,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { VscClose } from "react-icons/vsc";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useIsMobile } from "../../../../hook/useIsMobile";
import { useRouter } from "next/router";
import { PartMenu } from "../Video/PartMenu";
import Radio from "@mui/material/Radio";
import { HttpMethod, sendRequest } from "@/utils/axios";
import { toast } from "react-toastify";
import ErrorIcon from "@mui/icons-material/Error";

export const Grammer = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [answers, setAnswers] = useState<any>({});
    const [showModal, setShowModal] = useState<boolean>(false);
    const [exams, setExams] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const matches = useIsMobile();
    const router = useRouter();

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

        exams.forEach((item: any) => {
            const questionId = `${item.exam_id}`;
            answers[questionId] = formData.get(questionId);
        });

        exams.forEach((question: any, index: number) => {
            const questionId = question.exam_id;
            const correctAnswer = question.exam_information.correct_answer;
            const userAnswer = answers[questionId];

            if (userAnswer !== correctAnswer) {
                toast.error(`جواب سوال  ${index + 1} اشتباه است `);
                incorrectAnswers.push({
                    question: question.exam_name,
                    questionNumber: index + 1,
                    userAnswer,
                    correctAnswer,
                });
            }
        });

        if (incorrectAnswers.length == 0) {
            sendRequest("learnings/user/create", HttpMethod.POST, {
                session_id: router.query.slug,
            }).then((res) => {
                toast.success(res.data.farsi_message);
            });
        }
    };

    useEffect(() => {
        setLoading(true);

        sendRequest("exam/guest/getAll", HttpMethod.POST, {
            session_id: router.query.slug,
            exam_name: "",
            page: 1,
            count: 1000,
        })
            .then((res) => {
                setExams(res.data?.data.exam);
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
                            maxHeight: "calc(100vh - 250px)",
                            overflow: "auto",
                        }}
                    >
                        <Stack mb={3} direction={"row"} alignItems={"center"}>
                            <MoreVertIcon fontSize="small" color="primary" />
                            <Typography variant="h2">
                                سوالات گرامری این جلسه
                            </Typography>
                        </Stack>
                        <Typography>
                            پس از مشاهده درس لطفا به سوالات زیر پاسخ دهید.
                        </Typography>
                        <Divider sx={{ mt: 1 }} />
                        {loading ? (
                            <Stack alignItems={"center"} width={"100%"}>
                                <CircularProgress />
                            </Stack>
                        ) : (
                            <Stack
                                alignItems={"end"}
                                mt={2}
                                sx={{
                                    // maxHeight: "calc(100vh - 350px)",
                                    // overflow: "auto",
                                    pr: "20px",
                                }}
                            >
                                <form
                                    style={{ width: "100%" }}
                                    dir="ltr"
                                    onSubmit={handleSubmit}
                                >
                                    <FormControl
                                        sx={{ width: "100%" }}
                                        variant="standard"
                                    >
                                        {exams.length > 0 ? (
                                            exams.map(
                                                (item: any, index: number) => {
                                                    const questionId = `${item.exam_id}`;
                                                    const options = [
                                                        {
                                                            value: `${item?.exam_information?.wrong_answer_1}`,
                                                            label: item
                                                                ?.exam_information
                                                                ?.wrong_answer_1,
                                                        },
                                                        {
                                                            value: item
                                                                ?.exam_information
                                                                ?.wrong_answer_2,
                                                            label: item
                                                                ?.exam_information
                                                                ?.wrong_answer_2,
                                                        },
                                                        {
                                                            value: item
                                                                ?.exam_information
                                                                ?.wrong_answer_3,
                                                            label: item
                                                                ?.exam_information
                                                                ?.wrong_answer_3,
                                                        },
                                                        {
                                                            value: item
                                                                ?.exam_information
                                                                ?.correct_answer,
                                                            label: item
                                                                ?.exam_information
                                                                ?.correct_answer,
                                                        },
                                                    ];
                                                    const shuffledOptions =
                                                        options.sort(
                                                            () =>
                                                                Math.random() -
                                                                0.5
                                                        );

                                                    return (
                                                        <React.Fragment
                                                            key={index}
                                                        >
                                                            <FormLabel
                                                                id={`question-label-${index}`}
                                                                sx={{ mt: 3 }}
                                                            >
                                                                {`${
                                                                    index + 1
                                                                }. ${
                                                                    item.exam_name
                                                                }`}
                                                            </FormLabel>

                                                            <RadioGroup
                                                                aria-labelledby={`question-label-${index}`}
                                                                name={
                                                                    questionId
                                                                }
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
                                            )
                                        ) : (
                                            <Alert
                                                variant="standard"
                                                color="error"
                                                icon={<ErrorIcon />}
                                                sx={{ direction: "ltr" }}
                                            >
                                                یافت نشد!
                                            </Alert>
                                        )}

                                        <Divider />
                                        {exams.length > 0 && (
                                            <Stack alignItems={"end"}>
                                                <Button
                                                    sx={{ mt: 2, mr: 1 }}
                                                    type="submit"
                                                    variant="contained"
                                                >
                                                    ثبت پاسخ ها
                                                </Button>
                                            </Stack>
                                        )}
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
                        <PartMenu open={open} setOpen={setOpen} />
                    </Stack>
                </Grid>
            )}
        </Grid>
    );
};
