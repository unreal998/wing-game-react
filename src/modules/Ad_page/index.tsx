import React, { useEffect, useState } from "react";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MAIN_COLORS } from "../../shared/colors";

const AdPage: React.FC = () => {
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCloseButton(true);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowCloseButton(false);
  };

  return (
    <AppBar
      sx={{
        width: "100vw",
        height: "100px",
        backgroundColor: MAIN_COLORS.missionTable,
      }}
    >
      <Toolbar>
        <div style={{ flexGrow: 1 }} />
        {showCloseButton && (
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 0, right: 0, margin: 2 }}
          >
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AdPage;
