import React, { useState, useMemo } from "react";
import { Box, styled, Switch, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MAIN_COLORS } from "../../shared/colors";
import { heightProportion } from "../../shared/utils";
import Header from "../Header";
import Footer from "../Footer";
import Gear from "../../assets/gear.svg";
import { StyledBasicBox } from "../referal/components/StyledBasicBox";
import { TableBox } from "../referal/components/TableBox";
import Vector from "../../assets/Vector.svg";

const languages = {
  en: "English",
  ru: "Русский",
  ua: "Українська",
};
const CustomSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: MAIN_COLORS.contentYellow,
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#ccc",
  },
  "& .MuiSwitch-track": {
    backgroundColor: "#ccc",
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
    <Box>
      <Header />
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
          <img src={Gear} alt="gear" />
        </Box>
        <StyledBasicBox height={`${tableHeight}px`}>
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
        </StyledBasicBox>
      </Box>
      <Footer />
    </Box>
  );
};

export default Settings;
