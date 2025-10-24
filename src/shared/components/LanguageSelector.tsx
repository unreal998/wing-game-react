import React, { useState, useRef, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Vector from "../../assets/Vector.svg";
import { MAIN_COLORS } from "../colors";
import LanguageIcon from "@mui/icons-material/Language";

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
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    openUp: boolean;
  }>({
    top: 0,
    left: 0,
    openUp: false,
  });

  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const openUp = rect.bottom + 100 > viewportHeight;
      setDropdownPosition({
        top: openUp ? rect.top - 100 : rect.bottom + 5,
        left: rect.left,
        openUp,
      });
    }
  }, [isOpen]);

  const handleLanguageChange = (languageCode: LanguageCode) => {
    i18n.changeLanguage(languageCode);
    setSelectedLanguage(languageCode);
    setIsOpen(false);
    if (onLanguageChange) onLanguageChange(languageCode);
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        border: `1px solid ${MAIN_COLORS.mainGreen}`,
        borderRadius: "15px",
        padding: "5px 10px",
      }}
    >
      <Box
        ref={buttonRef}
        sx={{
          display: "flex",
          gap: "10px",
          cursor: "pointer",
          alignItems: "center",
          color: "#fff",
          minWidth: "110px",
          justifyContent: "space-around",
        }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Stack direction="row" alignItems="center" gap="5px">
          <LanguageIcon
            sx={{ fontSize: "18px", color: MAIN_COLORS.mainGreen }}
          />
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: MAIN_COLORS.mainGreen,
            }}
          >
            {languages[selectedLanguage]}
          </Typography>
        </Stack>
        <img src={Vector} alt="vector" />
      </Box>
      {isOpen && (
        <Box
          sx={{
            position: "fixed",
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            backgroundColor: "#000",
            borderRadius: "5px",
            padding: "5px 0",
            minWidth: "140px",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.4)",
            zIndex: 99999,
          }}
        >
          {Object.entries(languages).map(([code, name]) => (
            <Typography
              key={code}
              sx={{
                cursor: "pointer",
                padding: "8px 12px",
                color: "#fff",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                fontSize: "14px",
                fontWeight: 400,
              }}
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
