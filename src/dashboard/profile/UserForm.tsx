import { Box, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { CustomeLoadingButton } from "../../inputs/CustomLoadingButton";
import * as Yup from "yup";
import { CustomDatePicker } from "../../inputs/CustomDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useDashboard } from "@/src/layout/DashboardContext";
import { TextField } from "@/src/data-display/TextField";
import { HttpMethod, sendRequest } from "@/utils/axios";
import { catchRequestError } from "@/utils/functions";
import { toast } from "react-toastify";

const initialValues = {
    user_lastname: "",
    email: "",
    phone_number: "",
};

// @ts-ignore
export type FormValues = typeof initialValues;

const formValidation = Yup.object().shape({
    user_lastname: Yup.string().required("این فیلد الزامی است"),
    email: Yup.string().email("ایمیل صحیح نمی‌باشد"),
    phone_number: Yup.string(),
});

export const UserForm = () => {
    const [date, setDate] = useState<Date | null>(null);
    const [initialValue, setInitialValue] = useState<FormValues>(initialValues);
    const { profile, loading } = useDashboard();

    const formHandler = (v: any) => {
        if (date !== null) v.birthdate = date;

        sendRequest("users/user/setProfile", HttpMethod.POST, {
            user_profile: v,
        })
            .then(() => {
                toast.success("اطلاعات کاربری با موفقیت ثبت شد.");
            })
            .catch(catchRequestError);
        console.log(date);
    };
    useEffect(() => {
        if (profile) {
            const temp = {
                ...(profile.user_profile || {}), // Default to empty object if user_profile is undefined
                phone_number: profile.phone_number,
            };
            setInitialValue(temp);
            if (temp.birthdate) setDate(temp.birthdate);
            console.log(temp, profile);
        }
    }, [profile]);

    return (
        <Box
            sx={{
                background: "#E1D0C3",
                p: "20px 25px",
                borderRadius: "20px 20px 20px 20px",
                position: "relative",
            }}
        >
            <Formik
                initialValues={initialValue}
                validationSchema={formValidation}
                onSubmit={formHandler}
                enableReinitialize
                validateOnBlur={false}
            >
                <Form>
                    <Grid container spacing={[1, 3]} className="w-100">
                        <Grid item md={6} xs={12}>
                            <TextField
                                label="نام و نام خانوادگی"
                                name="user_lastname"
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <CustomDatePicker
                                label="تاریخ تولد"
                                setValue={setDate}
                                value={date}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField label="ایمیل" name="email" fullWidth />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                label="شماره موبایل"
                                name="phone_number"
                                fullWidth
                                disabled
                            />
                        </Grid>
                        <Grid item md={6} xs={12}></Grid>
                        <Grid item md={6} xs={12}>
                            <CustomeLoadingButton loading={loading}>
                                بروزرسانی
                            </CustomeLoadingButton>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </Box>
    );
};
