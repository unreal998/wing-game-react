import React, { useState } from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { heightProportion } from "../../shared/utils";
import Question from "../../assets/question.svg";
import { StyledBasicBox } from "../Referal_temp/components/StyledBasicBox";
import { CustomSwitch } from "./components/CustomSwitch";
import LanguageSelector from "../../shared/components/LanguageSelector";
import { TabBoxSettings } from "./components/TableBoxSettings";
import { MainBox } from "../../shared/components/MainBox";
import { NamedStyled } from "../../shared/components/NameStyled";
import { SubMainBox } from "./components/SubMainBox";

const Settings = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };
  return (
    <MainBox height={heightProportion}>
      <SubMainBox>
        <NamedStyled paddingBottom="8px">{t("Settings")}</NamedStyled>
        <img src={Question} alt="question" />
      </SubMainBox>
      <StyledBasicBox height={"160px"}>
        <TabBoxSettings>
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
        </TabBoxSettings>

        <TabBoxSettings justifyContent="space-between">
          <Typography sx={{ paddingTop: "10px", paddingBottom: "10px" }}>
            {t("Sound")}
          </Typography>
          <CustomSwitch
            checked={soundEnabled}
            onChange={() => setSoundEnabled(!soundEnabled)}
          />
        </TabBoxSettings>
      </StyledBasicBox>
    </MainBox>
  );
};

export default Settings;
