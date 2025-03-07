import React, { useState, useMemo } from "react";
import { Box, styled, Switch, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MAIN_COLORS } from "../../shared/colors";
import { heightProportion } from "../../shared/utils";
import Header from "../Header";
import Footer from "../Footer";
import Question from "../../assets/question.svg";
import { StyledBasicBox } from "../referal/components/StyledBasicBox";
import { TableBox } from "../referal/components/TableBox";
import Vector from "../../assets/Vector.svg";
import Night from "../../assets/night.svg";
import Light from "../../assets/brightness.svg";

const languages = {
  en: "English",
  ru: "Русский",
  ua: "Українська",
};
const CustomSwitch = styled(Switch)(() => ({
  width: 56,
  height: 30,
  padding: 0,
  display: "flex",
  justifyContent: "center",

  "& .MuiSwitch-switchBase": {
    padding: 4,
    "&.Mui-checked": {
      transform: "translateX(26px)",
      color: MAIN_COLORS.contentYellow,
      "& + .MuiSwitch-track": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
    },
  },

  "& .MuiSwitch-thumb": {
    width: 20,
    height: 20,
    marginTop: "1px",
  },

  "& .MuiSwitch-track": {
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    opacity: 1,
  },
}));

type LanguageCode = keyof typeof languages;

const Settings = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { t, i18n } = useTranslation();
  const tableHeight = useMemo(() => heightProportion - 265, []);

  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(
    i18n.language as LanguageCode,
  );

  const handleLanguageSelect = (languageCode: LanguageCode) => {
    i18n.changeLanguage(languageCode);
    setSelectedLanguage(languageCode);
    setIsLanguageMenuOpen(false);
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
      <StyledBasicBox height={"220px"}>
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
          <Box
            sx={{ display: "flex", gap: "10px", cursor: "pointer" }}
            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
          >
            <Typography>{languages[selectedLanguage]}</Typography>
            <img src={Vector} alt="vector" style={{ cursor: "pointer" }} />
          </Box>
        </TableBox>

        {isLanguageMenuOpen && (
          <Box
            sx={{
              position: "absolute",
              backgroundColor: MAIN_COLORS.referalBox,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              borderRadius: "5px",
              padding: "10px",
              left: "130px",
              marginTop: "40px",
            }}
          >
            {Object.entries(languages).map(([code, name]) => (
              <Typography
                key={code}
                sx={{ cursor: "pointer", padding: "5px 10px" }}
                onClick={() => handleLanguageSelect(code as LanguageCode)}
              >
                {name}
              </Typography>
            ))}
          </Box>
        )}
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "7px",
            paddingTop: "50px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: MAIN_COLORS.contentYellow,
              width: "79px",
              height: "37px",
              gap: "5px",
              borderRadius: "4px",
              boxShadow: "inset 0px 1px 1px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <img src={Night} alt="night" />{" "}
            <Typography
              sx={{ color: "black", fontSize: "14px", fontWeight: 700 }}
            >
              Night
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: MAIN_COLORS.walletButton,
              width: "79px",
              height: "37px",
              gap: "5px",
              borderRadius: "4px",
              boxShadow: "inset 0px 1px 1px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <img src={Light} alt="light" />{" "}
            <Typography
              sx={{
                color: MAIN_COLORS.textColor,
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              Light
            </Typography>
          </Box>
        </Box>
      </StyledBasicBox>
    </Box>
  );
};

export default Settings;
