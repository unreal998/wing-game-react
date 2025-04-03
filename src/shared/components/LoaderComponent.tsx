import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoaderComponent: React.FC<{ loading: boolean }> = ({ loading }) => {
  if (!loading) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default LoaderComponent;
