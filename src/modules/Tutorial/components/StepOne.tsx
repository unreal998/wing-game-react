import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

function StepOne({ onClick }: { onClick: () => void }) {
  const { t } = useTranslation();

  return (
    <Box
      onClick={onClick}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
      }}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: "24px",
          fontWeight: 700,
          maxWidth: "600px",
          textAlign: "center",
          padding: "100px 20px",
        }}
      >
        {t("tutorial.step1")}
      </Typography>
    </Box>
  );
}

export default StepOne;
