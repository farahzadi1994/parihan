import {
    Box,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { HttpMethod, sendRequest } from "@/utils/axios";

export const InvitedUsers = () => {
    const [rows, setRows] = useState<any[]>([]);

    function createData(name: string, calories: string, fat: string) {
        return { calories, name, fat };
    }

    useEffect(() => {
        sendRequest("users/user/getInvites", HttpMethod.POST, {
            page: 1,
            count: 10000,
        }).then((res) => {
            let temp: any = [];
            res.data?.data.users.map((item: any) => {
                temp.push(
                    createData(
                        item?.user_profile?.user_lastname,
                        item.is_enrolled == 0
                            ? "بدون دوره"
                            : item.is_enrolled == 1
                            ? "دوره برنزی"
                            : item.is_enrolled == 2
                            ? "دوره نقره ای"
                            : "دوره طلایی",
                        item?.phone_number
                    )
                );
            });
            setRows(temp);
        });
    }, []);
    return (
        <Stack
            sx={{
                background: "#E1D0C3",
                p: "20px 25px",
                borderRadius: "20px 20px 20px 20px",
                position: "relative",
            }}
            gap={2}
        >
            <Stack direction={"row"} alignItems={"center"}>
                <MoreVertIcon fontSize="small" color="primary" />
                <Typography variant="h2">لیست کاربران دعوت شده</Typography>
            </Stack>
            <TableContainer sx={{ background: "none", border: "none" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="center">
                                نام و نام خانوادگی
                            </TableCell>
                            <TableCell align="center">
                                وضعیت خرید دوره
                            </TableCell>
                            <TableCell align="center">شماره موبایل</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={row.name}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                >
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">
                                    {row.calories}
                                </TableCell>
                                <TableCell align="center">{row.fat}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};
