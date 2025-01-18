import { catchRequestError, convertNumberToEn } from "@/utils/functions";
import { Button, Grid, InputAdornment, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { HttpMethod, sendRequest } from "../../utils/axios";
import { setToken } from "../../utils/cookies";
import { CustomeLink } from "../data-display/CustomeLink";
import { useIsMobile } from "../hook/useIsMobile";
import { CustomeLoadingButton } from "../inputs/CustomLoadingButton";
import { TextField } from "../inputs/TextField";
import { ContentWrapper } from "../layout/ContentWrapper";
import { Logo } from "../layout/Logo";
type FormValues = typeof initialValues;

const initialValues = {
  username: "",
  password: "",
};

const formValidation = Yup.object().shape({
  username: Yup.string().required("این فیلد الزامی است"),
  password: Yup.string().required("این فیلد الزامی است"),
});

const Login: React.FC = () => {
  // state
  const [loading, setLoading] = useState<boolean>(false);
  const [getCode, setGetCode] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [fakeToken, setFakeToken] = useState<string>("");
  const searchParams = useSearchParams();

  // router
  const router = useRouter();
  const matches = useIsMobile();

  const loginFormHandler = (obj: FormValues) => {
    setLoading(true);
    sendRequest(
      "users/user/validate",
      HttpMethod.POST,
      {
        sms_code: obj.password,
      },
      false,
      fakeToken
    )
      .then((response) => {
        if (response.data.data !== null) {
          if (searchParams.has("redirectTo")) router.push("/dashboard/plans");
          else router.push("/dashboard/");
          setToken(response.data.data.token);
        } else {
          toast.error(response.data.farsi_message);
        }
      })
      .catch((e) => {})
      .finally(() => setLoading(false));
  };

  const codeHandler = () => {
    if (phoneNumber !== undefined) {
      sendRequest("users/guest/login", HttpMethod.POST, {
        phone_number: convertNumberToEn(phoneNumber, "string"),
      })
        .then((response) => {
          if (response.data.code == 400) {
            toast.error(response.data.farsi_message);
          } else {
            toast.success(`کد به شماره ${phoneNumber} ارسال شد`);
            setFakeToken(response.data.data.token);

            setGetCode(true);
          }
        })
        .catch((error) => catchRequestError(error))
        .finally(() => {});
    }
  };

  return (
    <ContentWrapper
      sx={{
        backgroundImage: "url(./images/login-background.webp)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "25px",
        }}
      >
        <Box
          className={"responsive-on-height"}
          sx={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "2px solid",
            borderColor: "secondary.light",
            boxShadow: "1px 6px 45px rgba(0, 0, 0, 0.25)",
            borderRadius: "10px",
            width: { md: "440px", xs: "340px" },
            maxWidth: { md: "440px", xs: "340px" },
            padding: { md: "40px", xs: "30px" },
            gap: 3,
          }}
        >
          <Logo />
          <Formik
            initialValues={initialValues}
            validationSchema={formValidation}
            onSubmit={loginFormHandler}
          >
            <Form>
              <Grid container rowSpacing="20px">
                <Grid item xs={24}>
                  <TextField
                    label=" شماره تماس"
                    name="username"
                    placeholder="شماره تماس خود را وارد کنید"
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                    type="tel"
                    endAdornment={
                      <InputAdornment position="end">
                        <Button
                          variant="contained"
                          onClick={codeHandler}
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
                    label="کد پیامکی"
                    name="password"
                    placeholder="کد پیامک شده خود را وارد کنید"
                    type="password"
                    disabled={!getCode}
                  />
                </Grid>
                <Grid item xs={24}>
                  <CustomeLoadingButton
                    loading={loading}
                    sx={{
                      marginTop: { md: 4, xs: 2 },
                      padding: "11px 22px",
                    }}
                    disabled={!getCode}
                  >
                    ورود به حساب کاربری
                  </CustomeLoadingButton>
                </Grid>
              </Grid>
            </Form>
          </Formik>
          <Box
            sx={{
              textAlign: "center",
              gap: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="body2">تماس با پشتیبانی:</Typography>
            <CustomeLink
              href="tel:02191096725"
              sx={{
                color: `secondary.main`,
                fontWeight: "bold",
              }}
              fontSize={18}
            >
              02191096725
            </CustomeLink>
          </Box>
          <Box sx={{ display: "flex", gap: { md: 3, xs: 2 } }}>
            <Typography variant="body2">
              پروفایل کاربری ندارید؟&nbsp;
              <b>
                <Link href={"register"}>
                  <span
                    style={{
                      color: `#751a29`,
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    ثبت نام کنید
                  </span>
                </Link>
              </b>
            </Typography>
          </Box>
        </Box>
      </Box>
      {!matches && (
        <Box
          sx={{
            // backgroundColor: "rgb(43, 40, 40, 0.5)",
            // width: { md: "50%", xs: "100%" },
            height: "100vh",
            // boxShadow: "0px 13px 24px rgba(0, 0, 0, 0.25)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "25px",
            padding: "2.2% 7%",
          }}
        >
          <Box
            sx={{
              backgroundImage: "url(./images/login-image.webp)",
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "100%",
              width: "500px",
              borderRadius: "25px",
            }}
          ></Box>
        </Box>
      )}
    </ContentWrapper>
  );
};

export default Login;
