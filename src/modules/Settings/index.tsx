import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { heightProportion } from "../../shared/utils";
import Question from "../../assets/question.svg";
import { StyledBasicBox } from "../referal/components/StyledBasicBox";
import { TableBox } from "../referal/components/TableBox";
import { CustomSwitch } from "./components/CustomSwitch";
import LanguageSelector from "../../shared/LanguageSelector";

const Settings = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <Box sx={{ padding: "5px 15px 0 15px", height: `${heightProportion}px` }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontSize: "24px", fontWeight: 700, paddingBottom: "8px" }}
        >
          {t("Settings")}
        </Typography>
        <img src={Question} alt="question" />
      </Box>
      <StyledBasicBox height={"160px"}>
        <TableBox sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Typography
            sx={{
              paddingTop: "10px",
              paddingBottom: "10px",
              textTransform: "capitalize",
            }}
          >
            {t("Language")}:
          </Typography>
          <LanguageSelector onLanguageChange={handleLanguageChange} />
        </TableBox>

        <TableBox
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ paddingTop: "10px", paddingBottom: "10px" }}>
            {t("Sound")}
          </Typography>
          <CustomSwitch
            checked={soundEnabled}
            onChange={() => setSoundEnabled(!soundEnabled)}
          />
        </TableBox>
      </StyledBasicBox>
    </Box>
  );
};

export default Settings;
