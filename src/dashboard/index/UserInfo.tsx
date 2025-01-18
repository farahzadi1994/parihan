import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useRouter } from "next/router";

export const UserInfo = () => {
    const router = useRouter();

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
                <Typography variant="h2">اطلاعات کاربری</Typography>
            </Stack>
            <Stack
                sx={{
                    p: "10px 15px",
                    background: "#5A72B7",
                    borderRadius: "20px",
                    border: "1px solid #E1D0C3",
                    cursor: "pointer",
                }}
                direction="row"
                alignItems={"start"}
                gap={2}
                onClick={() => router.push("dashboard/profile")}
            >
                <ManageAccountsIcon color="info" />
                <Typography color={"#fff"}>
                    کاربر عزیز لطفا اطلاعات کاربری خود را تکمیل کنید
                </Typography>
            </Stack>
            <Stack
                sx={{
                    p: "10px 15px",
                    background: "#33B69D",
                    borderRadius: "20px",
                    border: "1px solid #E1D0C3",
                    cursor: "pointer",
                }}
                alignItems={"start"}
                gap={2}
                onClick={() => router.push("dashboard/profile")}
            >
                <Stack direction="row" alignItems={"start"} gap={2}>
                    <ManageAccountsIcon color="info" />
                    <Typography color={"#fff"}>ثبت کد معرف</Typography>
                </Stack>
                <Typography color={"#fff"} fontSize="14px">
                    با ثبت کد معرف ۱۰۰ امتیاز به صندوق امتیازات شما اضافه خواهد
                    شد
                </Typography>
            </Stack>
        </Stack>
    );
};
