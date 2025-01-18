import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Divider,
    Drawer,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { VscClose } from "react-icons/vsc";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useIsMobile } from "../../../../hook/useIsMobile";
import { useRouter } from "next/router";
import { PartMenu } from "../Video/PartMenu";
import { HttpMethod, sendRequest } from "@/utils/axios";
import { toast } from "react-toastify";
import ErrorIcon from "@mui/icons-material/Error";

export const Quiz = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any[]>([]);
    const [answers, setAnswers] = useState<any>();
    const matches = useIsMobile();
    const router = useRouter();
    const examsRef = useRef<any>([]);
    const inputRefs = useRef<any>({});

    useEffect(() => {
        setLoading(true);

        sendRequest("quizes/guest/getAll", HttpMethod.POST, {
            session_id: router.query.slug,
            quiz_name: "",
            page: 1,
            count: 1000,
        })
            .then((res) => {
                examsRef.current = res.data?.data.quizes;
            })
            .finally(() => {
                setLoading(false);
            });
    }, [router.query]);

    const handleInputChange = (id: number, value: string) => {
        inputRefs.current[id] = value;
    };

    const complate = () => {
        if (answers && Object.keys(answers).length == examsRef.current.length) {
            sendRequest("learnings/user/create", HttpMethod.POST, {
                session_id: router.query.slug,
            }).then(() => toast.success("پاسخ‌ها با موفقیت ثبت شد"));
        } else if (answers !== undefined) {
            toast.error(
                `پاسخی برای سوالات ${findMissingNumbers().join(
                    ", "
                )} ثبت نشده است`
            );
        } else toast.error("پاسخی هنوز ثبت نشده است");
    };

    const findMissingNumbers = () => {
        let temp: number[] = [];
        const allNumbers = [...(Array(examsRef.current.length).keys() as any)]; // آرایه‌ای از اعداد 0 تا 10
        allNumbers.map((item: any) => {
            if (!Object.keys(answers).includes(String(item))) temp.push(item);
        });
        console.log(temp, Object.keys(answers));

        return temp.map((num) => num + 1);
    };

    const handleSubmit = (id: number, currect: string) => {
        setAnswers((prevAnswers: any) => {
            // به‌روزرسانی بر اساس درست یا غلط بودن جواب
            const updatedAnswers = { ...prevAnswers };
            if (inputRefs.current[id] == currect) {
                updatedAnswers[id] = inputRefs.current[id];
            } else {
                delete updatedAnswers[id];
            }
            return updatedAnswers;
        });
        if (inputRefs.current[id] == currect) {
            toast.success("پاسخ درست شما ثبت شد");
        } else toast.error("پاسخ اشتباه است");
    };

    useEffect(() => {
        console.log(answers);
    }, [answers]);

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
                        // height={550}
                    >
                        <Stack mb={3} direction={"row"} alignItems={"center"}>
                            <MoreVertIcon fontSize="small" color="primary" />
                            <Typography variant="h2">
                                سوالات این جلسه
                            </Typography>
                        </Stack>
                        <Typography>
                            برای مشاهده جزئیات روی کلمات کلیک نمائید.
                        </Typography>
                        <Divider sx={{ mt: 1 }} />

                        {loading ? (
                            <Stack alignItems={"center"} width={"100%"}>
                                <CircularProgress />
                            </Stack>
                        ) : examsRef.current.length > 0 ? (
                            <React.Fragment>
                                {examsRef.current.map(
                                    (item: any, index: number) => {
                                        if (
                                            item.question_type == "VOICE" ||
                                            item.question_type == "VIDEO" ||
                                            item.quiz_information.answer_type ==
                                                "TEXT"
                                        ) {
                                            return (
                                                <React.Fragment key={index}>
                                                    <Typography
                                                        fontFamily={
                                                            "mr-eaves-modern"
                                                        }
                                                        sx={{
                                                            direction: "rtl",
                                                        }}
                                                        textAlign={"left"}
                                                        display={"flex"}
                                                        mt={2}
                                                    >
                                                        {item.quiz_name}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            direction: "rtl",
                                                        }}
                                                        textAlign={"left"}
                                                        display={"flex"}
                                                    >
                                                        {
                                                            item
                                                                .quiz_information
                                                                .test_title_translate
                                                        }
                                                    </Typography>
                                                    <Divider sx={{ mt: 2 }} />
                                                    <Box>
                                                        <Stack
                                                            direction={
                                                                item.question_type == "VIDEO"
                                                                  ? "column"
                                                                  : matches
                                                                  ? "column"
                                                                  : "row"
                                                              }
                                                            justifyContent={
                                                                item.question_type ==
                                                                "VOICE"
                                                                    ? "space-between"
                                                                    : "end"
                                                            }
                                                            mt={2}
                                                            mb={2}
                                                        >
                                                            {item.question_type ==
                                                            "VOICE"
                                                                ? item
                                                                      .quiz_information
                                                                      .question_image !==
                                                                      null && (
                                                                      <div>
                                                                          <audio
                                                                              controls
                                                                              controlsList="nodownload"
                                                                          >
                                                                              <source
                                                                                  src={
                                                                                      item
                                                                                          .quiz_information
                                                                                          .question_image
                                                                                  }
                                                                                  type="audio/mpeg"
                                                                              />
                                                                          </audio>
                                                                      </div>
                                                                  )
                                                                : item.question_type ==
                                                                      "VIDEO" &&
                                                                  item
                                                                      .quiz_information
                                                                      .question_image !==
                                                                      null && (
                                                                      <video
                                                                          id="video"
                                                                          controls={
                                                                              true
                                                                          }
                                                                          preload="auto"
                                                                          width="100%"
                                                                          style={{
                                                                              borderRadius:
                                                                                  "15px",
                                                                          }}
                                                                      >
                                                                          <source
                                                                              id="mp4"
                                                                              src={
                                                                                  item
                                                                                      .quiz_information
                                                                                      .question_image as string
                                                                              }
                                                                              type="video/mp4"
                                                                          />
                                                                      </video>
                                                                  )}
                                                            <Typography
                                                                fontFamily={
                                                                    "mr-eaves-modern"
                                                                }
                                                                sx={{
                                                                    direction:
                                                                        "rtl",
                                                                }}
                                                                fontSize={"1.2rem"}
                                                                marginTop={"1rem"}
                                                                textAlign={
                                                                    "right"
                                                                }
                                                                display={"flex"}
                                                                alignItems={
                                                                    "center"
                                                                }
                                                                // maxWidth={
                                                                //     "300px"
                                                                // }
                                                            >
                                                                {index + 1}.
                                                                {
                                                                    item
                                                                        .quiz_information
                                                                        .test_extra_question
                                                                }
                                                            </Typography>
                                                        </Stack>
                                                        <Grid
                                                            container
                                                            spacing={[2, 1]}
                                                        >
                                                            <Grid
                                                                item
                                                                md={4}
                                                                xs={12}
                                                            >
                                                                <Stack
                                                                    direction={
                                                                        "row"
                                                                    }
                                                                    gap={1}
                                                                    width={
                                                                        "100%"
                                                                    }
                                                                >
                                                                    <Button
                                                                        variant="outlined"
                                                                        onClick={() =>
                                                                            toast.info(
                                                                                item
                                                                                    .quiz_information
                                                                                    .correct_answer,
                                                                                {
                                                                                    className:
                                                                                        "toast-container",
                                                                                    autoClose: 5000, // بسته شدن خودکار بعد از 3 ثانیه
                                                                                    style: {
                                                                                        direction:
                                                                                            "ltr",
                                                                                    },
                                                                                    position:
                                                                                        "top-center",
                                                                                }
                                                                            )
                                                                        }
                                                                    >
                                                                        مشاهده
                                                                        پاسخ
                                                                    </Button>
                                                                    <Button
                                                                        variant="contained"
                                                                        size="large"
                                                                        onClick={() =>
                                                                            handleSubmit(
                                                                                index,
                                                                                item
                                                                                    .quiz_information
                                                                                    .correct_answer
                                                                            )
                                                                        }
                                                                    >
                                                                        ثبت پاسخ
                                                                    </Button>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                md={8}
                                                                xs={12}
                                                            >
                                                                <TextField
                                                                    InputProps={{
                                                                        inputProps:
                                                                            {
                                                                                dir: "ltr", // Force the text input to be LTR
                                                                            },
                                                                    }}
                                                                    name="1"
                                                                    // label="Type your answer"
                                                                    fullWidth
                                                                    placeholder="Type your answer"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleInputChange(
                                                                            index,
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Box>

                                                    <Divider
                                                        sx={{ m: "20px 0" }}
                                                    />
                                                </React.Fragment>
                                            );
                                        }
                                        if (
                                            item.quiz_information.answer_type ==
                                            "3CHOICES"
                                        ) {
                                            const questionId = `${item.exam_id}`;
                                            const options = [
                                                {
                                                    value: `${item?.quiz_information?.wrong_answer_1}`,
                                                    label: item
                                                        ?.quiz_information
                                                        ?.wrong_answer_1,
                                                },
                                                {
                                                    value: item
                                                        ?.quiz_information
                                                        ?.wrong_answer_2,
                                                    label: item
                                                        ?.quiz_information
                                                        ?.wrong_answer_2,
                                                },

                                                {
                                                    value: item
                                                        ?.quiz_information
                                                        ?.correct_answer,
                                                    label: item
                                                        ?.quiz_information
                                                        ?.correct_answer,
                                                },
                                            ];
                                            const shuffledOptions =
                                                options.sort(
                                                    () => Math.random() - 0.5
                                                );

                                            return (
                                                <React.Fragment key={index}>
                                                    <Typography
                                                        fontFamily={
                                                            "mr-eaves-modern"
                                                        }
                                                        sx={{
                                                            direction: "rtl",
                                                        }}
                                                        textAlign={"left"}
                                                        display={"flex"}
                                                        mt={2}
                                                    >
                                                        {item.quiz_name}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            direction: "rtl",
                                                        }}
                                                        textAlign={"left"}
                                                        display={"flex"}
                                                    >
                                                        {
                                                            item
                                                                .quiz_information
                                                                .test_title_translate
                                                        }
                                                    </Typography>
                                                    <Divider
                                                        sx={{ mt: 2, mb: 2 }}
                                                    />
                                                    <Stack>
                                                        <FormLabel
                                                            id={`question-label-${index}`}
                                                            sx={{
                                                                direction:
                                                                    "rtl",
                                                                textAlign:
                                                                    "right",
                                                            }}
                                                        >
                                                            {`${index + 1}. ${
                                                                item
                                                                    .quiz_information
                                                                    .test_extra_question
                                                            }`}
                                                        </FormLabel>
                                                    </Stack>

                                                    <RadioGroup
                                                        aria-labelledby={`question-label-${index}`}
                                                        name={questionId}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <Grid
                                                            container
                                                            sx={{
                                                                direction:
                                                                    "rtl",
                                                            }}
                                                        >
                                                            {shuffledOptions.map(
                                                                (
                                                                    option,
                                                                    idx
                                                                ) => (
                                                                    <Grid
                                                                        item
                                                                        md={6}
                                                                        xs={12}
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
                                                    <Stack
                                                        direction={
                                                            !matches
                                                                ? "column"
                                                                : "row"
                                                        }
                                                        gap={1}
                                                        width={"100%"}
                                                    >
                                                        <Button
                                                            variant="outlined"
                                                            onClick={() =>
                                                                toast.info(
                                                                    item
                                                                        .quiz_information
                                                                        .correct_answer,
                                                                    {
                                                                        className:
                                                                            "toast-container",
                                                                        autoClose: 5000, // بسته شدن خودکار بعد از 3 ثانیه
                                                                        style: {
                                                                            direction:
                                                                                "ltr",
                                                                        },
                                                                        position:
                                                                            "top-center",
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            مشاهده پاسخ
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            size="large"
                                                            onClick={() =>
                                                                handleSubmit(
                                                                    index,
                                                                    item
                                                                        .quiz_information
                                                                        .correct_answer
                                                                )
                                                            }
                                                        >
                                                            ثبت پاسخ
                                                        </Button>
                                                    </Stack>
                                                    <Divider
                                                        sx={{ mt: 2, mb: 2 }}
                                                    />
                                                </React.Fragment>
                                            );
                                        }
                                        if (
                                            item.quiz_information.answer_type ==
                                            "2CHOICES"
                                        ) {
                                            const questionId = `${item.exam_id}`;
                                            const options = [
                                                {
                                                    value: `${item?.quiz_information?.wrong_answer_1}`,
                                                    label: item
                                                        ?.quiz_information
                                                        ?.wrong_answer_1,
                                                },

                                                {
                                                    value: item
                                                        ?.quiz_information
                                                        ?.correct_answer,
                                                    label: item
                                                        ?.quiz_information
                                                        ?.correct_answer,
                                                },
                                            ];
                                            const shuffledOptions =
                                                options.sort(
                                                    () => Math.random() - 0.5
                                                );

                                            return (
                                                <React.Fragment key={index}>
                                                    <Typography
                                                        fontFamily={
                                                            "mr-eaves-modern"
                                                        }
                                                        sx={{
                                                            direction: "rtl",
                                                        }}
                                                        textAlign={"left"}
                                                        display={"flex"}
                                                        mt={2}
                                                    >
                                                        {item.quiz_name}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            direction: "rtl",
                                                        }}
                                                        textAlign={"left"}
                                                        display={"flex"}
                                                    >
                                                        {
                                                            item
                                                                .quiz_information
                                                                .test_title_translate
                                                        }
                                                    </Typography>
                                                    <Divider
                                                        sx={{ mt: 2, mb: 2 }}
                                                    />
                                                    <Stack>
                                                        <FormLabel
                                                            id={`question-label-${index}`}
                                                            sx={{
                                                                direction:
                                                                    "rtl",
                                                                textAlign:
                                                                    "right",
                                                            }}
                                                        >
                                                            {`${index + 1}. ${
                                                                item
                                                                    .quiz_information
                                                                    .test_extra_question
                                                            }`}
                                                        </FormLabel>
                                                    </Stack>

                                                    <RadioGroup
                                                        aria-labelledby={`question-label-${index}`}
                                                        name={questionId}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <Grid
                                                            container
                                                            sx={{
                                                                direction:
                                                                    "rtl",
                                                            }}
                                                        >
                                                            {shuffledOptions.map(
                                                                (
                                                                    option,
                                                                    idx
                                                                ) => (
                                                                    <Grid
                                                                        item
                                                                        md={6}
                                                                        xs={12}
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
                                                    <Stack
                                                        direction={
                                                            matches
                                                                ? "column"
                                                                : "row"
                                                        }
                                                        gap={1}
                                                        width={"100%"}
                                                    >
                                                        <Button
                                                            variant="outlined"
                                                            onClick={() =>
                                                                toast.info(
                                                                    item
                                                                        .quiz_information
                                                                        .correct_answer,
                                                                    {
                                                                        className:
                                                                            "toast-container",
                                                                        autoClose: 5000,
                                                                        style: {
                                                                            direction:
                                                                                "ltr",
                                                                        },
                                                                        position:
                                                                            "top-center",
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            مشاهده پاسخ
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            size="large"
                                                            onClick={() =>
                                                                handleSubmit(
                                                                    index,
                                                                    item
                                                                        .quiz_information
                                                                        .correct_answer
                                                                )
                                                            }
                                                        >
                                                            ثبت پاسخ
                                                        </Button>
                                                    </Stack>
                                                    <Divider
                                                        sx={{ mt: 2, mb: 2 }}
                                                    />
                                                </React.Fragment>
                                            );
                                        }
                                        if (
                                            item.quiz_information.answer_type ==
                                            "4CHOICES"
                                        ) {
                                            const questionId = `${item.exam_id}`;
                                            const options = [
                                                {
                                                    value: `${item?.quiz_information?.wrong_answer_1}`,
                                                    label: item
                                                        ?.quiz_information
                                                        ?.wrong_answer_1,
                                                },
                                                {
                                                    value: `${item?.quiz_information?.wrong_answer_2}`,
                                                    label: item
                                                        ?.quiz_information
                                                        ?.wrong_answer_2,
                                                },
                                                {
                                                    value: `${item?.quiz_information?.wrong_answer_3}`,
                                                    label: item
                                                        ?.quiz_information
                                                        ?.wrong_answer_3,
                                                },
                                                {
                                                    value: item
                                                        ?.quiz_information
                                                        ?.correct_answer,
                                                    label: item
                                                        ?.quiz_information
                                                        ?.correct_answer,
                                                },
                                            ];
                                            const shuffledOptions =
                                                options.sort(
                                                    () => Math.random() - 0.5
                                                );

                                            return (
                                                <React.Fragment key={index}>
                                                    <Typography
                                                        fontFamily={
                                                            "mr-eaves-modern"
                                                        }
                                                        sx={{
                                                            direction: "rtl",
                                                        }}
                                                        textAlign={"left"}
                                                        display={"flex"}
                                                        mt={2}
                                                    >
                                                        {item.quiz_name}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            direction: "rtl",
                                                        }}
                                                        textAlign={"left"}
                                                        display={"flex"}
                                                    >
                                                        {
                                                            item
                                                                .quiz_information
                                                                .test_title_translate
                                                        }
                                                    </Typography>
                                                    <Divider
                                                        sx={{ mt: 2, mb: 2 }}
                                                    />
                                                    <Stack>
                                                        <FormLabel
                                                            id={`question-label-${index}`}
                                                            sx={{
                                                                direction:
                                                                    "rtl",
                                                                textAlign:
                                                                    "right",
                                                            }}
                                                        >
                                                            {`${index + 1}. ${
                                                                item
                                                                    .quiz_information
                                                                    .test_extra_question
                                                            }`}
                                                        </FormLabel>
                                                    </Stack>

                                                    <RadioGroup
                                                        aria-labelledby={`question-label-${index}`}
                                                        name={questionId}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <Grid
                                                            container
                                                            sx={{
                                                                direction:
                                                                    "rtl",
                                                            }}
                                                        >
                                                            {shuffledOptions.map(
                                                                (
                                                                    option,
                                                                    idx
                                                                ) => (
                                                                    <Grid
                                                                        item
                                                                        md={6}
                                                                        xs={12}
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
                                                    <Stack
                                                        direction={
                                                            matches
                                                                ? "column"
                                                                : "row"
                                                        }
                                                        gap={1}
                                                        width={"100%"}
                                                    >
                                                        <Button
                                                            variant="outlined"
                                                            onClick={() =>
                                                                toast.info(
                                                                    item
                                                                        .quiz_information
                                                                        .correct_answer,
                                                                    {
                                                                        className:
                                                                            "toast-container",
                                                                        autoClose: 5000, // بسته شدن خودکار بعد از 3 ثانیه
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            مشاهده پاسخ
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            size="large"
                                                            onClick={() =>
                                                                handleSubmit(
                                                                    index,
                                                                    item
                                                                        .quiz_information
                                                                        .correct_answer
                                                                )
                                                            }
                                                        >
                                                            ثبت پاسخ
                                                        </Button>
                                                    </Stack>
                                                    <Divider
                                                        sx={{ mt: 2, mb: 2 }}
                                                    />
                                                </React.Fragment>
                                            );
                                        }
                                    }
                                )}
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={complate}
                                >
                                    ثبت همه پاسخ ها
                                </Button>
                            </React.Fragment>
                        ) : (
                            <Alert
                                variant="standard"
                                color="error"
                                icon={<ErrorIcon />}
                                sx={{ mt: 3 }}
                            >
                                یافت نشد!
                            </Alert>
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
