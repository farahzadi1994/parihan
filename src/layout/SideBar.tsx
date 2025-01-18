import {
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React, { useEffect } from "react";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import ContactSupportRoundedIcon from "@mui/icons-material/ContactSupportRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useRouter } from "next/router";
import { useIsMobile } from "../hook/useIsMobile";
import { MobileSideBar } from "./MobileSideBar";
import { useDashboard } from "./DashboardContext";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
export const SideBar = () => {
  const router = useRouter();
  const matches = useIsMobile();
  const { profile } = useDashboard();
  const [collapse, setCollaps] = React.useState<boolean>(false);
  const [showImage, setShowImage] = React.useState(false);

  const [subMenuOpen, setSubMenuOpen] = React.useState<boolean>(
    router.pathname.includes("general-course") ||
      router.pathname.includes("vocabulary")
  );

  const handleClick = () => {
    setSubMenuOpen((r) => !r);
  };

  return (
    <Box
      sx={{
        width: matches ? "100%" : !collapse ? "320px" : "85px",
        background: "#F9F5F2",
        padding: "15px",
        boxShadow: 3,
        borderRadius: "30px",
        height: matches ? "auto" : "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        transition: "width 0.4s",
      }}
    >
      {matches ? (
        <MobileSideBar />
      ) : (
        <>
          {!collapse && (
            <Box
              sx={{
                position: "absolute",
                right: 0,
                top: "35px",
                p: "7px 0",
                borderRadius: "10px 0px 0px 10px",
                color: "#fff",
                display: "flex",
                background: "#d1c5bb",
                cursor: "pointer",
                "& svg": {
                  width: "15px",
                },
              }}
              onClick={() => setCollaps(true)}
            >
              <ArrowForwardIosRoundedIcon />
            </Box>
          )}
          <Stack justifyContent={"center"} alignItems={"center"} gap={1}>
            {!collapse ? (
              <img
                src="/images/logo.svg"
                width={"200px"}
                onClick={() => router.push("https://parihanenglish.com")}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <MenuRoundedIcon
                sx={{ cursor: "pointer", mb: 2 }}
                onClick={() => setCollaps(false)}
              />
            )}
            <Divider sx={{ height: "1px", width: "100%" }} />

            <List
              sx={{
                width: "100%",
                "& .Mui-selected": {
                  color: "#fff !important",
                  background: "rgb(117, 26, 41) !important",
                  borderRadius: "10px",
                },
                "& .Mui-selected:hover": {
                  background: "rgba(255, 255, 255, 0.25)",
                },
                "& svg": {
                  color: "#d1c5bb",
                },
                ".muirtl-66vpte-MuiButtonBase-root-MuiListItemButton-root:hover":
                  {
                    borderRadius: "10px",
                  },
                "& .MuiListItemButton-root": {
                  borderRadius: "10px",
                },
              }}
            >
              <ListItem disableGutters>
                <ListItemButton
                  selected={
                    router.pathname.split("/").length == 2 &&
                    router.pathname.includes("dashboard")
                  }
                  onClick={(event) => router.push("/dashboard")}
                >
                  <ListItemIcon>
                    <DashboardRoundedIcon />
                  </ListItemIcon>
                  {!collapse && <ListItemText primary="داشبورد" />}
                </ListItemButton>
              </ListItem>
              <ListItem disableGutters>
                <ListItemButton
                  selected={router.pathname.includes("profile")}
                  onClick={(event) => router.push("/dashboard/profile")}
                >
                  <ListItemIcon>
                    <ManageAccountsRoundedIcon />
                  </ListItemIcon>
                  {!collapse && <ListItemText primary="اطلاعات کاربری" />}
                </ListItemButton>
              </ListItem>
              <ListItem disableGutters>
                <ListItemButton
                  selected={router.pathname.includes("invites")}
                  onClick={(event) => router.push("/dashboard/invites")}
                >
                  <ListItemIcon>
                    <GroupAddRoundedIcon />
                  </ListItemIcon>
                  {!collapse && <ListItemText primary="دعوت از دوستان" />}
                </ListItemButton>
              </ListItem>
              <ListItem disableGutters>
                <ListItemButton
                  selected={router.pathname.includes("plans")}
                  onClick={(event) => router.push("/dashboard/plans")}
                >
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  {!collapse && <ListItemText primary="خرید دوره" />}
                </ListItemButton>
              </ListItem>
              <ListItemButton
                selected={router.pathname.includes("courses")}
                onClick={() => {
                  router.push("/dashboard/courses");
                  handleClick();
                }}
              >
                <ListItemIcon>
                  <SchoolRoundedIcon />
                </ListItemIcon>
                {!collapse && <ListItemText primary="آموزش و دوره‌ها" />}
                {subMenuOpen
                  ? !collapse && <ExpandLess />
                  : !collapse && <ExpandMore />}
              </ListItemButton>
              {profile?.is_enrolled !== 0 && (
                <Collapse in={subMenuOpen}>
                  <List
                    component="div"
                    disablePadding
                    sx={{
                      fontSize: "8px",
                      "& .muirtl-cveggr-MuiListItemIcon-root": {
                        // minWidth: '30px',
                      },
                    }}
                  >
                    {!collapse && (
                      <ListItemButton
                        onClick={() =>
                          router.push("/dashboard/courses/general-course")
                        }
                        sx={{
                          // pl: 9,
                          "& .MuiListItemText-root": {
                            color: router.pathname.includes("general-course")
                              ? "rgb(117, 26, 41)"
                              : "#000",
                          },
                          pl: 4,
                        }}
                      >
                        <ListItemIcon>
                          <DescriptionRoundedIcon />
                        </ListItemIcon>
                        {!collapse && (
                          <ListItemText
                            sx={{
                              fontSize: "10px !important",
                            }}
                            primary="دوره عمومی زبان انگلیسی"
                          />
                        )}
                      </ListItemButton>
                    )}
                    {/* <ListItemButton
                                        onClick={() => router.push('/dashboard/courses/vocabulary')}
                                        sx={{
                                            '& .MuiListItemText-root': {
                                                color: router.pathname.includes('vocabulary')
                                                    ? 'rgb(117, 26, 41)'
                                                    : '#000',
                                            },
                                            pl: 4,
                                        }}
                                    >
                                        <ListItemIcon>
                                            <DescriptionRoundedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="دوره رشد لغت" />
                                    </ListItemButton> */}
                  </List>
                </Collapse>
              )}
              <ListItem disableGutters>
                <ListItemButton
                  selected={router.pathname.includes("dashboard/scors")}
                  onClick={() => router.push("/dashboard/scors")}
                >
                  <ListItemIcon>
                    <AccountBalanceWalletRoundedIcon />
                  </ListItemIcon>
                  {!collapse && <ListItemText primary="صندوق امتیازات من" />}
                </ListItemButton>
              </ListItem>
            </List>
          </Stack>
          <Stack gap={1}>
            {!collapse ? (
              <Stack gap={1}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<TelegramIcon />}
                  href="https://t.me/Parihanengsupport"
                  target="_blank"
                >
                  پشتیانی تلگرام
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<WhatsAppIcon />}
                  href="https://wa.me/989337556534"
                  target="_blank"
                >
                  پشتیانی واتس آپ
                </Button>
              </Stack>
            ) : (
              <Stack gap={1}>
                <IconButton
                  href="https://t.me/Parihanengsupport"
                  target="_blank"
                  color="primary"
                >
                  <TelegramIcon />
                </IconButton>
                <IconButton
                  href="https://wa.me/989337556534"
                  target="_blank"
                  color="primary"
                >
                  <WhatsAppIcon />
                </IconButton>
              </Stack>
            )}
            <Divider sx={{ height: "1px", width: "100%" }} />
            <ListItemButton
              sx={{
                background: "#ede8e4",
                p: "5px 15px",
                color: "rgb(117, 26, 41)",
                borderRadius: "10px",
                "& svg": {
                  color: "rgb(117, 26, 41)",
                },
              }}
              selected={router.pathname.includes("/dashboard/support")}
              onClick={() => router.push("/logout")}
            >
              <ListItemIcon>
                <MeetingRoomRoundedIcon />
              </ListItemIcon>
              {!collapse && <ListItemText primary="خروج از حساب کاربری" />}
            </ListItemButton>
          </Stack>
        </>
      )}
    </Box>
  );
};
