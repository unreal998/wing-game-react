import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Orck from "../../assets/flagOrc.png";
import Ua from "../../assets/flagUa.png";
import Uk from "../../assets/flagUk.png";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const Languageselector = () => {
  const { t } = useTranslation();

  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(
    null,
  );

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    handleLanguageMenuClose();
  }; // TO DO REPLACE I18N TO REDUX

  const languages = [
    { code: "ru", label: "Русский", avatar: Orck, alt: "Русский" },
    { code: "ua", label: "Українська", avatar: Ua, alt: "Українська" },
    { code: "en", label: "English", avatar: Uk, alt: "English" },
  ];

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          width: "1320px",
        }}
      >
        <Box>
          <Typography variant="h1" fontWeight={"bold"}>
            {t("Test")}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={languages.find((lang) => lang.code === i18n.language)?.avatar}
            alt={`${i18n.language} flag`}
            sx={{ cursor: "pointer", width: 32, height: 32 }}
            onClick={handleLanguageMenuOpen}
          />
          <Menu
            anchorEl={languageAnchorEl}
            open={Boolean(languageAnchorEl)}
            onClose={handleLanguageMenuClose}
          >
            {languages.map(({ code, label, avatar, alt }) => (
              <MenuItem key={code} onClick={() => handleLanguageChange(code)}>
                <Avatar
                  src={avatar}
                  alt={alt}
                  sx={{ width: 24, height: 24, marginRight: 1 }}
                />
                {label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Languageselector;
