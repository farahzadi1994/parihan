import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { NextPage } from "next";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import AdapterJalali from "@date-io/jalaali";
import theme from "../theme";
import { ToastContainer } from "react-toastify";
import { Alert, Grid, Stack } from "@mui/material";
import { SideBar } from "./SideBar";
import { DasboardWrapper } from "./DasboardWrapper";
import { useIsMobile } from "../hook/useIsMobile";
import { DashboardProvider } from "./DashboardContext";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export const ConstLayout = (props: {
  children: JSX.Element;
  pageTitle?: string;
}) => {
  const matches = useIsMobile();
  const [open, setOpen] = React.useState(true);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <DashboardProvider>
          {open && (
            <Alert severity="warning" onClose={() => setOpen(false)}>
              جهت عملکرد بهتر سایت فیلترشکن خود را خاموش کنید.
            </Alert>
          )}

          <Grid
            container
            sx={{
              maxWidth: "1600px",
              margin: "0 auto",
              height: "100%",
              padding: {
                md: "20px 25px",
                xs: "10px 12px 40px 12px",
              },
            }}
            gap={2}
          >
            <Grid item md={"auto"} xs={12}>
              <SideBar />
            </Grid>
            <Grid item xs position={"relative"}>
              <DasboardWrapper pageTitle={props.pageTitle}>
                {props.children}
              </DasboardWrapper>
            </Grid>
          </Grid>
          <ToastContainer rtl hideProgressBar closeButton={true} />
        </DashboardProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};
