import { Alert, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import React, { useState } from "react";
import { ContentWrapper } from "../../layout/ContentWrapper";
import { Logo } from "../../layout/Logo";
import { FormValues, RegisterForm } from "./Form";
import { useIsMobile } from "../../hook/useIsMobile";

const Register: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormValues>({
    username: "",
    password: "",
    phone: "",
  });

  const matches = useIsMobile();

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
          gap: "30px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            textShadow: "0px 2px 15px rgba(0, 0, 0, 0.35)",
          }}
        >
          ثبت‌نام در آکادمی زبان پریحان
        </Typography>
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
            padding: { md: "40px", xs: "20px" },
            gap: 4,
          }}
        >
          <Logo />

          <RegisterForm />
          <Box sx={{ display: "flex", gap: { md: 3, xs: 2 } }}>
            <Typography variant="body2">
              پروفایل کاربری دارید؟&nbsp;
              <b>
                <Link href={"login"}>
                  <span
                    style={{
                      color: `#751a29`,
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    وارد شوید
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

export default Register;
