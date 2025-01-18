import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  Link,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { HttpMethod, sendRequest } from "../../../utils/axios";
import { removeToken, setToken } from "../../../utils/cookies";
import { catchRequestError, convertNumberToEn } from "../../../utils/functions";
import { CustomeLoadingButton } from "../../inputs/CustomLoadingButton";
import { TextField } from "../../inputs/TextField";
export type FormValues = typeof initialValues;

const initialValues = {
  username: "",
  password: "",
  phone: "",
};

// @ts-ignore

export const RegisterForm = () => {
  // state
  const [loading, setLoading] = useState<boolean>(false);
  const [getCode, setGetCode] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [name, setName] = useState<string>();
  const [checked, setChecked] = useState<boolean>(false);
  // router
  const router = useRouter();

  const sendCode = () => {
    sendRequest("users/guest/register", HttpMethod.POST, {
      phone_number: convertNumberToEn(phoneNumber, "string"),
      user_lastname: name,
      birthdate: "",
      email: "",
    })
      .then((response) => {
        if (response.data.data !== null) {
          toast.success(`کد به شماره ${phoneNumber} ارسال شد`);
          setToken(response.data.data.token);
          setGetCode(true);
        } else {
          toast.error(response.data.farsi_message);
        }
      })
      .catch(catchRequestError)
      .finally(() => setLoading(false));
  };

  const registerFormHandler = (obj: FormValues) => {
    if (checked) {
      setLoading(true);
      sendRequest("users/user/validate", HttpMethod.POST, {
        sms_code: obj.password,
      })
        .then((response) => {
          if (response.data.data !== null) {
            router.push("/dashboard/");
            setToken(response.data.data.token);
          } else {
            removeToken();
            toast.error(response.data.farsi_message);
          }
        })
        .catch((e) => {})
        .finally(() => setLoading(false));
    } else toast.error("شرایط و قوانین پذیرفته نشده است");
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={registerFormHandler}
      validateOnBlur={false}
    >
      <Form>
        <Grid container rowSpacing="20px">
          <Grid item xs={24}>
            <TextField
              label="نام و نام خانوادگی"
              name="name"
              placeholder="نام و نام خانوادگی خود را وارد کنید"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={24}>
            <TextField
              label=" شماره تماس"
              name="phoneNumber"
              placeholder="شماره تماس خود را وارد کنید"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    onClick={sendCode}
                    variant="contained"
                    disabled={getCode}
                  >
                    ارسال رمز
                  </Button>
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={24}>
            <TextField
              label="کد پیامک شده"
              name="password"
              placeholder="کد پیامک شده خود را وارد کنید"
              type="password"
              autoComplete={"new-password"}
              disabled={!getCode}
            />
          </Grid>
          <Grid item xs={24}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => setChecked((r) => !r)}
                  checked={checked}
                />
              }
              label={
                <span>
                  <Link href="https://parihanenglish.com/terms">شرایط</Link> را
                  مطالعه کرده‌ و می‌پذیرم.
                </span>
              }
              labelPlacement="end"
            />
          </Grid>
          <Grid item xs={24}>
            <CustomeLoadingButton
              loading={loading}
              sx={{
                marginTop: { md: 1, xs: 2 },
                padding: "11px 22px",
              }}
              disabled={!getCode}
            >
              ثبت نام در آکادمی زبان پریحان
            </CustomeLoadingButton>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};
