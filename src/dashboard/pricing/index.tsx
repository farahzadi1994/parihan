import Modal from "@/src/common/Modal";
import { useDashboard } from "@/src/layout/DashboardContext";
import { HttpMethod, sendRequest } from "@/utils/axios";
import { showPrice } from "@/utils/functions";
import Check from "@mui/icons-material/Check";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Chip,
  CircularProgress,
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemIcon,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { ArrowLeftIcon } from "@mui/x-date-pickers";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Pricing = () => {
  const [data, setData] = useState<any>();
  const [succses, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [unsuccses, setUnsuccess] = useState<boolean>(false);

  const { profile } = useDashboard();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    sendRequest("courses/guest/getAll", HttpMethod.POST, {
      course_name: "",
      page: 1,
      count: 1,
    })
      .then((res) => {
        setData(res.data?.data?.courses[0]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (router.query.payment) {
      if (router.query.payment == "true") setSuccess(true);
      else if (router.query.payment == "false") setUnsuccess(true);
    }
  }, [router]);

    const get = (plan: number) => {
      sendRequest("users/user/setEnrollments", HttpMethod.POST, {
        is_enrolled: plan,
      }).then((res) => {
        if (res.data.code == 200) router.push(res.data?.data?.url);
        else toast.error(res.data.farsi_message);
      });
    };

  // const payWithZarinpalDiscount = (plan: number) => {
  //   switch (plan) {
  //     case 1:
  //       router.push(`https://zarinp.al/648914`);
  //       break;
  //     case 2:
  //       router.push(`https://zarinp.al/648924`);
  //       break;
  //     case 3:
  //       router.push(`https://zarinp.al/648932`);
  //       break;

  //     default:
  //       break;
  //   }
  // };

  return (
    <React.Fragment>
      {loading ? (
        <Stack alignItems={"center"} width={"100%"}>
          <CircularProgress />
        </Stack>
      ) : (
        <Grid2
          mt={5}
          container
          spacing={[7, 3]}

          // alignItems={"center"}
        >
          <Grid2 size={12}>
            <Alert variant="standard" color="warning">
              جهت ارتقای بسته با تیم پشتیبانی تماس بگیرید
            </Alert>
          </Grid2>
          <Grid2 size={{ md: 4, xs: 12 }}>
            <Card raised variant="outlined">
              <CardMedia
                sx={{ height: 140 }}
                image={"/images/sliver_header.jpg"}
                title="green iguana"
              />
              <Stack direction={"row"} p={2} justifyContent={"space-between"}>
                <Stack fontFamily={"Yekan"}>
                  <Typography
                    // style={{
                    //     textDecoration: "line-through",
                    // }}
                    variant="h2"
                  >
                    {showPrice(parseInt(data?.third_package?.package_price_3))}{" "}
                    تومان
                  </Typography>
                  {/* <Typography
                                        style={{ color: "red", marginTop: 10 }}
                                        variant="h2"
                                        fontSize={16}
                                    >
                                        با ۴۰% تخفیف {showPrice(2700000)} تومان
                                    </Typography> */}
                </Stack>
                <Chip
                  size="small"
                  variant="filled"
                  color="primary"
                  label={data?.third_package?.package_name_3}
                />
              </Stack>

              <Divider />
              <List
                sx={{
                  mx: "calc(-1 * var(--ListItem-paddingX))",
                }}
              >
                {data?.third_package?.feature_1_3 && (
                  <ListItem>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    {data?.third_package?.feature_1_3}
                  </ListItem>
                )}
                {data?.third_package?.feature_2_3 && (
                  <ListItem>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    {data?.third_package?.feature_2_3}
                  </ListItem>
                )}
                {data?.third_package?.feature_3_3 && (
                  <ListItem>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    {data?.third_package?.feature_3_3}
                  </ListItem>
                )}
                {data?.third_package?.feature_4_3 && (
                  <ListItem>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    {data?.third_package?.feature_4_3}
                  </ListItem>
                )}
                {data?.third_package?.feature_5_3 && (
                  <ListItem>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    {data?.third_package?.feature_5_3}
                  </ListItem>
                )}
              </List>
              <Divider />
              <CardActions>
                <Typography sx={{ mr: "auto" }}>
                  {profile?.is_enrolled > 1 ? "" : ""}
                </Typography>

                <Button
                  variant="text"
                  color="primary"
                  endIcon={<ArrowLeftIcon />}
                  onClick={() => get(1)}
                  // onClick={() => payWithZarinpalDiscount(1)}
                  disabled={profile?.is_enrolled >= 1}
                >
                  ثبت خرید
                </Button>
              </CardActions>
            </Card>
          </Grid2>
          <Grid2 size={{ md: 4, xs: 12 }}>
            <Card variant="outlined">
              <CardMedia
                sx={{ height: 140 }}
                image={"/images/diamond_header.jpg"}
                title="green iguana"
              />
              <Stack direction={"row"} p={2} justifyContent={"space-between"}>
                <Stack fontFamily={"Yekan"}>
                  <Typography
                    // style={{
                    //     textDecoration: "line-through",
                    // }}
                    variant="h2"
                  >
                    {showPrice(parseInt(data?.main_package?.package_price))}{" "}
                    تومان
                  </Typography>
                  {/* <Typography
                                        style={{ color: "red", marginTop: 10 }}
                                        variant="h2"
                                        fontSize={16}
                                    >
                                        با ۴۰% تخفیف {showPrice(11880000)} تومان
                                    </Typography> */}
                </Stack>
                <Chip
                  size="small"
                  variant="filled"
                  color="primary"
                  label={data?.main_package?.package_name}
                />
              </Stack>

              <Divider />
              <List
                sx={{
                  mx: "calc(-1 * var(--ListItem-paddingX))",
                }}
              >
                {data?.main_package?.feature_1 && (
                  <ListItem>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    {data?.main_package?.feature_1}
                  </ListItem>
                )}
                {data?.main_package?.feature_2 && (
                  <ListItem>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    {data?.main_package?.feature_2}
                  </ListItem>
                )}
                {data?.main_package?.feature_3 && (
                  <ListItem>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    {data?.main_package?.feature_3}
                  </ListItem>
                )}
                {data?.main_package?.feature_4 && (
                  <ListItem>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    {data?.main_package?.feature_4}
                  </ListItem>
                )}
                {data?.main_package?.feature_5 && (
                  <ListItem>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    {data?.main_package?.feature_5}
                  </ListItem>
                )}
              </List>
              <Divider />
              <CardActions>
                <Typography sx={{ mr: "auto" }}>{}</Typography>
                <Button
                  variant="text"
                  color="primary"
                  endIcon={<ArrowLeftIcon />}
                    onClick={() => get(3)}
                  // onClick={() => payWithZarinpalDiscount(3)}
                  disabled={profile?.is_enrolled >= 3}
                >
                  ثبت خرید
                </Button>
              </CardActions>
            </Card>
          </Grid2>
          <Grid2 size={{ md: 4, xs: 12 }}>
            <Card variant="outlined">
              <CardMedia
                sx={{ height: 140 }}
                image={"/images/gold_header.jpg"}
                title="green iguana"
              />
              <Stack direction={"row"} p={2} justifyContent={"space-between"}>
                <Stack fontFamily={"Yekan"}>
                  <Typography
                    // style={{
                    //     textDecoration: "line-through",
                    // }}
                    variant="h2"
                  >
                    {showPrice(parseInt(data?.second_package?.package_price_2))}{" "}
                    تومان
                  </Typography>
                  {/* <Typography
                                        style={{ color: "red", marginTop: 10 }}
                                        variant="h2"
                                        fontSize={16}
                                    >
                                        با ۴۰% تخفیف {showPrice(3900000)} تومان
                                    </Typography> */}
                </Stack>
                <Chip
                  size="small"
                  variant="filled"
                  color="primary"
                  label={data?.second_package?.package_name_2}
                />
              </Stack>

              <Divider />
              <List
                sx={{
                  mx: "calc(-1 * var(--ListItem-paddingX))",
                }}
              >
                {data?.second_package?.feature_1_2 && (
                  <ListItem>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    {data?.second_package?.feature_1_2}
                  </ListItem>
                )}
                {data?.second_package?.feature_2_2 && (
                  <ListItem>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    {data?.second_package?.feature_2_2}
                  </ListItem>
                )}
                {data?.second_package?.feature_3_2 && (
                  <ListItem>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    {data?.second_package?.feature_3_2}
                  </ListItem>
                )}
                {data?.second_package?.feature_4_2 && (
                  <ListItem>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    {data?.second_package?.feature_4_2}
                  </ListItem>
                )}
                {data?.second_package?.feature_5_2 && (
                  <ListItem>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    {data?.second_package?.feature_5_2}
                  </ListItem>
                )}
              </List>
              <Divider />
              <CardActions>
                <Typography sx={{ mr: "auto" }}></Typography>
                <Button
                  variant="text"
                  color="primary"
                  endIcon={<ArrowLeftIcon />}
                    onClick={() => get(2)}
                  // onClick={() => payWithZarinpalDiscount(2)}
                  disabled={profile?.is_enrolled >= 2}
                >
                  ثبت خرید
                </Button>
              </CardActions>
            </Card>
          </Grid2>

          <Modal open={succses} dir="rtl" onClose={() => setSuccess(false)}>
            <Stack alignItems={"center"} gap={3}>
              <img src="/images/logo.svg" width={"150px"} />
              <Typography>
                خرید شما از آکادمی پریحان با موفقیت انجام شد.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push("/dashboard/courses")}
              >
                شروع دوره
              </Button>
            </Stack>
          </Modal>
          <Modal open={unsuccses} dir="rtl" onClose={() => setUnsuccess(false)}>
            <Stack alignItems={"center"} gap={3}>
              <img src="/images/logo.svg" width={"150px"} />
              <Typography>پرداخت شما ناموفق بود، مجدد تلاش کنید.</Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => setUnsuccess(false)}
              >
                خرید مجدد
              </Button>
            </Stack>
          </Modal>
        </Grid2>
      )}
    </React.Fragment>
  );
};
