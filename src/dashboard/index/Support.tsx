import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useIsMobile } from "../../hook/useIsMobile";
import Link from "next/link";

export const Support = () => {
  const matches = useIsMobile();

  return (
    <Stack
      sx={{
        background: "#fff",
        borderRadius: "20px",
        p: "20px 20px",
        border: "1px solid #751A298F",
      }}
      gap={4}
    >
      <Stack direction={"row"} alignItems={"center"}>
        <MoreVertIcon fontSize="small" color="primary" />
        <Typography variant="h2">پشتیبانی</Typography>
      </Stack>
      <Link href="https://t.me/Parihanengsupport" target="_blank">
        <Stack
          sx={{
            p: "22px 15px",
            background: "#FBCD1A",
            borderRadius: "20px",
            border: "1px solid #E1D0C3",
            position: "relative",
          }}
          direction="row"
          alignItems={"start"}
          gap={1}
        >
          <TelegramIcon />
          <Typography>پشتیبانی ما در تلگرام</Typography>
          {!matches && (
            <img
              src="/images/support-image-1.png"
              style={{
                position: "absolute",
                bottom: "0",
                left: 0,
                width: "90px",
              }}
            />
          )}
        </Stack>
      </Link>
      <Link href="https://wa.me/989337556534" target="_blank">
        <Stack
          sx={{
            p: "22px 15px",
            background: "#F04D42",
            borderRadius: "20px",
            border: "1px solid #E1D0C3",
            position: "relative",
          }}
          direction="row"
          alignItems={"start"}
          gap={1}
        >
          <WhatsAppIcon color="info" />
          <Typography color={"#fff"}>پشتیبانی ما در واتس آپ</Typography>
          {!matches && (
            <img
              src="/images/support-image-2.png"
              style={{
                position: "absolute",
                bottom: "0",
                left: 0,
                width: "90px",
              }}
            />
          )}
        </Stack>
      </Link>
    </Stack>
  );
};
