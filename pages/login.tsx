import type { NextPage } from "next";
import Login from "../src/auth/Login";
import { PageProvider } from "../src/common/PageProvider";
import { Alert } from "@mui/material";
import React from "react";

const LoginPage: NextPage = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <PageProvider title="آکادمی زبان پریحان | ورود">
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
      <Login />
    </PageProvider>
  );
};

export default LoginPage;
