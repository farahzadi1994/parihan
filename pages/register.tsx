import Register from "@/src/auth/register/Register";
import { PageProvider } from "@/src/common/PageProvider";
import { Alert } from "@mui/material";
import type { NextPage } from "next";
import React from "react";

const RegisterPage: NextPage = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <PageProvider title="آکادمی زبان پریحان | ثبت نام">
      {open && (
        <Alert severity="success" onClose={() => setOpen(false)}>
          لطفا جهت وارد نمودن شماره همراه و سایر اعداد، کیبرد خود را در حالت
          انگلیسی قرار دهید.
        </Alert>
      )}
      {open && (
        <Alert severity="warning" onClose={() => setOpen(false)}>
          جهت عملکرد بهتر سایت فیلترشکن خود را خاموش کنید.
        </Alert>
      )}
      <Register />
    </PageProvider>
  );
};

export default RegisterPage;
