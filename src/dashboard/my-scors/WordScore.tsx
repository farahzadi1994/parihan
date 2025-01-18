import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useIsMobile } from "../../hook/useIsMobile";
import { HttpMethod, sendRequest } from "@/utils/axios";
import { toast } from "react-toastify";
import { catchRequestError } from "@/utils/functions";

export const WordScore = () => {
    const [value, setValue] = useState<string>("");

    const matches = useIsMobile();

    const sendData = () => {
        if (value) {
            sendRequest("transactions/user/submitWord", HttpMethod.POST, {
                word: value,
            })
                .then((res) => {
                    res.data.code == 200
                        ? toast.success(res.data.farsi_message)
                        : toast.error(res.data.farsi_message);
                })
                .catch(catchRequestError);
        }
    };
    // https://server.parihanenglish.com/transactions/user/submitWord

    return (
        <Stack
            sx={{
                background: "#fff",
                borderRadius: "20px",
                p: "20px 20px",
                border: "1px solid #751A298F",
            }}
            gap={3}
        >
            <Stack direction={"row"} alignItems={"center"}>
                <MoreVertIcon fontSize="small" color="primary" />
                <Typography variant="h2">کلید واژه دوره زبان عمومی</Typography>
            </Stack>
            <Typography fontSize={14}>
                کلید واژه موجود در دوره عمومی زبان را وارد کنید و ۵۰۰ امیتاز
                دریافت کنید.
            </Typography>
            <Stack
                direction={matches ? "column" : "row"}
                gap={2}
                paddingBottom={1.5}
            >
                <TextField
                    name="code"
                    placeholder="-"
                    sx={{ textAlign: "center" }}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button variant="contained" onClick={sendData}>
                    ثبت کلید واژه
                </Button>
            </Stack>
        </Stack>
    );
};
