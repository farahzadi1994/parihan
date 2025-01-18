import {
    Button,
    Grid,
    Link,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import { useDashboard } from "@/src/layout/DashboardContext";
import { toast } from "react-toastify";

export const Code = () => {
    const { profile, loading } = useDashboard();

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
                <Typography variant="h2"> کد معرف شما</Typography>
            </Stack>
            <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                    <TextField
                        disabled
                        value={profile?.invite_code}
                        fullWidth
                    />
                </Grid>
                <Grid item md={6} xs={12} justifyContent={"center"}>
                    <Button
                        variant="text"
                        startIcon={<ShareIcon fontSize="small" />}
                        onClick={() => {
                            navigator.clipboard.writeText(profile?.invite_code);
                            toast.success("کپی شد!");
                        }}
                        size="large"
                        fullWidth
                    >
                        کپی کنید{" "}
                    </Button>
                </Grid>
            </Grid>
        </Stack>
    );
};
