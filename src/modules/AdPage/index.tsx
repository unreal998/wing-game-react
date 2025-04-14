import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MAIN_COLORS } from "../../shared/colors";

const AdPage = () => {
  const adLink = "https://example.com/ad";
  const imgURL = "https://via.placeholder.com/728x90.png?text=Your+Ad+Here";
  const timeToHide = 10;

  const [showBanner, setShowBanner] = useState(true);
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    const closeBtnTimer = setTimeout(() => {
      setShowCloseButton(true);
    }, 5000);

    const autoHideTimer = setTimeout(() => {
      setShowBanner(false);
    }, timeToHide * 1000);

    return () => {
      clearTimeout(closeBtnTimer);
      clearTimeout(autoHideTimer);
    };
  }, []);

  const handleClose = () => {
    setShowBanner(false);
  };

  const handleBannerClick = () => {
    window.open(adLink, "_blank");
  };

  if (!showBanner) return null;

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: MAIN_COLORS.missionTable,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={handleBannerClick}
    >
      <Box>
        <div style={{ flexGrow: 1 }} />
        {showCloseButton && (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            sx={{ position: "absolute", top: 0, right: 0, margin: 2 }}
          >
            <CloseIcon sx={{ color: "black" }} />
          </IconButton>
        )}
      </Box>
      <img
        src={imgURL}
        alt="Ad"
        style={{ height: "80px", objectFit: "contain" }}
      />
    </Box>
  );
};

export default AdPage;
