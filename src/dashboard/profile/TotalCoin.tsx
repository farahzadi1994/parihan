import { Link, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { HttpMethod, sendRequest } from "@/utils/axios";

export const TotalCoin = () => {
    const [total, setTotal] = useState<number>(0);
    useEffect(() => {
        sendRequest("transactions/user/getAll", HttpMethod.POST, {
            page: 1,
            count: 10000,
        }).then((res) => {
            let temp = 0;
            res.data.data?.transactions.map((item: any) => {
                temp += item.transaction_amount;
            });
            setTotal(temp);
        });
    }, []);

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
                <Typography variant="h2">جمع امتیازات شما</Typography>
            </Stack>
            <Stack direction="row" alignItems={"center"} gap={1}>
                <Typography fontFamily={"mr-eaves-modern"} fontSize={22}>
                    PARICOIN <span style={{ fontWeight: "bold" }}>{total}</span>
                </Typography>
                <img src="/images/coin.png" alt="" style={{ width: "65px" }} />
            </Stack>
            <Link href="/dashboard/scors" variant="body2" align="right">
                مشاهده جزيیات
            </Link>
        </Stack>
    );
};
