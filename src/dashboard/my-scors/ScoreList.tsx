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

export const ScoreList = () => {
    const [rows, setRows] = useState<any[]>([]);

    function createData(name: number, calories: string) {
        return { calories, name };
    }

    useEffect(() => {
        sendRequest("transactions/user/getAll", HttpMethod.POST, {
            page: 1,
            count: 10000,
        }).then((res) => {
            let temp: any = [];
            res.data?.data.transactions.map((item: any) => {
                temp.push(
                    createData(
                        item?.transaction_amount,
                        item.transaction_description
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
                maxHeight: "400px",
                overflow: "auto",
            }}
            gap={2}
        >
            <Stack direction={"row"} alignItems={"center"}>
                <MoreVertIcon fontSize="small" color="primary" />
                <Typography variant="h2">لیست امیتازات شما</Typography>
            </Stack>
            <TableContainer sx={{ background: "none", border: "none" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="center">میزان امتیاز</TableCell>
                            <TableCell align="center">کسب شده بابت</TableCell>
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
                                <TableCell align="center">
                                    {index + 1}
                                </TableCell>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                >
                                    <Stack
                                        direction={"row"}
                                        alignItems={"center"}
                                        justifyContent={"space-between"}
                                    >
                                        {row.calories}
                                        <img
                                            src="/images/coin.png"
                                            alt=""
                                            style={{ width: "25px" }}
                                        />
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};
