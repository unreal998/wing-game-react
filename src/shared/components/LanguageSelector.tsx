import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Vector from "../../assets/Vector.svg";

const languages = {
  en: "English",
  ru: "Русский",
};

type LanguageCode = keyof typeof languages;

interface LanguageSelectorProps {
  onLanguageChange?: (language: LanguageCode) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  onLanguageChange,
}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(
    i18n.language as LanguageCode,
  );

  const handleLanguageChange = (languageCode: LanguageCode) => {
    i18n.changeLanguage(languageCode);
    setSelectedLanguage(languageCode);
    setIsOpen(false);
    if (onLanguageChange) {
      onLanguageChange(languageCode);
    }
  };

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <Box
        sx={{ display: "flex", gap: "10px", cursor: "pointer" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Typography>{languages[selectedLanguage]}</Typography>
        <img src={Vector} alt="vector" />
      </Box>

      {isOpen && (
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "black",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            borderRadius: "5px",
            padding: "10px",
            left: "0px",
            marginTop: "5px",
            zIndex: 100,
          }}
        >
          {Object.entries(languages).map(([code, name]) => (
            <Typography
              key={code}
              sx={{ cursor: "pointer", padding: "5px 10px" }}
              onClick={() => handleLanguageChange(code as LanguageCode)}
            >
              {name}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default LanguageSelector;
