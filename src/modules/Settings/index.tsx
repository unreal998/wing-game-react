import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MAIN_COLORS } from "../../shared/colors";
import { heightProportion } from "../../shared/utils";
import Question from "../../assets/question.svg";
import { StyledBasicBox } from "../referal/components/StyledBasicBox";
import { TableBox } from "../referal/components/TableBox";
import Vector from "../../assets/Vector.svg";
import Night from "../../assets/night.svg";
import Light from "../../assets/brightness.svg";
import { CustomSwitch } from "./components/CustomSwitch";

const languages = {
  en: "English",
  ru: "Русский",
  ua: "Українська",
};

type LanguageCode = keyof typeof languages;

const Settings = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { t, i18n } = useTranslation();

  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(
    i18n.language as LanguageCode,
  );

  const handleLanguageSelect = (languageCode: LanguageCode) => {
    i18n.changeLanguage(languageCode);
    setSelectedLanguage(languageCode);
    setIsLanguageMenuOpen(false);
  };

  const [colors, setColors] = useState([
    MAIN_COLORS.activeTabColor,
    MAIN_COLORS.walletButton,
  ]);

  const swapColors = () => {
    setColors(([first, second]) => [second, first]);
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
            paddingTop: "17px",
          }}
        >
          {[
            { img: Night, text: "Night", textColor: "black" },
            { img: Light, text: "Light", textColor: MAIN_COLORS.textColor },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors[index],
                width: "79px",
                height: "37px",
                gap: "5px",
                borderRadius: "4px",
                boxShadow: "inset 0px 1px 1px 0px rgba(0, 0, 0, 0.25)",
                cursor: "pointer",
              }}
              onClick={swapColors}
            >
              <img src={item.img} alt={item.text} />
              <Typography
                sx={{
                  color: item.textColor,
                  fontSize: "14px",
                  fontWeight: 700,
                }}
              >
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </StyledBasicBox>
    </Box>
  );
};

export default Settings;
