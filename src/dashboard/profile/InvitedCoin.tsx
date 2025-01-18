import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useIsMobile } from "../../hook/useIsMobile";
import { HttpMethod, sendRequest } from "@/utils/axios";
import { toast } from "react-toastify";
import { catchRequestError } from "@/utils/functions";

export const InvitedCoin = () => {
    const [value, setValue] = useState<string>("");

    const matches = useIsMobile();

    const sendData = () => {
        if (value) {
            sendRequest("users/user/setInviter", HttpMethod.POST, {
                invite_code: value,
            })
                .then((res) => {
                    res.data.code == 200
                        ? toast.success(res.data.farsi_message)
                        : toast.error(res.data.farsi_message);
                })
                .catch(catchRequestError);
        }
    };
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
                <Typography variant="h2">ثبت کد معرف شما</Typography>
            </Stack>
            <Typography>
                با ثبت کد معرف ۱۰۰ امتیاز به صندوق امتیازات شما اضافه خواهد شد.
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
                    ثبت کد معرف
                </Button>
            </Stack>
        </Stack>
    );
};
