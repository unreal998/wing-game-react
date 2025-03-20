import { Box, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { MAIN_COLORS } from "../../shared/colors";
import { TableBox } from "./components/TableBox";
import Male from "../../assets/Male.svg";
import { TableBoxHead } from "./components/TableBoxHead";
import { StyledHeader } from "./components/StyledHeader";
import { StyledMain } from "./components/StyledMain";
import { StyledMainColumn } from "./components/StyledMainColumn";
import { StyledMainTypography } from "./components/StyledMainTypography";
import { StyledMainJpg } from "./components/StyledMainJpg";
import Copy from "../../assets/copy.svg";
import { StyledCopy } from "./components/StyledCopy";
import { StyledInputBox } from "./components/StyledInputBox";
import { StyledInput } from "./components/StyledInput";
import { heightProportion } from "../../shared/utils";
import { InfoBox } from "../../shared/components/InfoBox";
import { useTranslation } from "react-i18next";
import { MainBox } from "../../shared/MainBox";
import { NamedStyled } from "../../shared/components/NameStyled";
import { StyledBasicBox } from "./components/StyledBasicBox";
import { HeaderTypographyStyle } from "./components/HeaderTypographyStyle";

const commonImgStyle = { width: "33px", height: "33px", borderRadius: "52px" };

const Referal = () => {
  const { t } = useTranslation();
  const [inviteText, setInviteText] = useState(t("Invite a friend"));

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(inviteText)
      .then(() => {
        console.log("Copied:", inviteText);
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  };

  const tableHeight = useMemo(() => heightProportion - 285, []);

  return (
    <MainBox height={heightProportion}>
      <Box>
        <NamedStyled paddingBottom="8px">{t("Referal")}</NamedStyled>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <InfoBox value={"234"} subtitle={t("Your bonus")} />
          <InfoBox value={"10%"} subtitle={t("Rang")} />
        </Box>
        <StyledBasicBox height={`${tableHeight}px`}>
          <TableBox>
            {["User", "Level", "Coin"].map((item, index) => (
              <StyledHeader
                key={index}
                sx={{
                  flex: index === 0 ? 1.6 : 0.7,
                  paddingLeft: index === 0 ? "5px" : "0",
                }}
              >
                <TableBoxHead>
                  <Typography sx={{ fontSize: "12px" }}>{t(item)}</Typography>
                </TableBoxHead>
              </StyledHeader>
            ))}
          </TableBox>
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <TableBox key={index}>
                <StyledMain>
                  <StyledMainJpg>
                    <img src={Male} alt="male" style={commonImgStyle} />
                    <StyledMainTypography>
                      {t("Name User")}
                    </StyledMainTypography>
                  </StyledMainJpg>
                </StyledMain>
                {[10, 234].map((value, idx) => (
                  <StyledMainColumn key={idx}>
                    <StyledMainTypography
                      sx={idx === 1 ? { color: MAIN_COLORS.gold } : {}}
                    >
                      {value} {idx === 0 ? "%" : ""}
                    </StyledMainTypography>
                  </StyledMainColumn>
                ))}
              </TableBox>
            ))}
        </StyledBasicBox>
        <Box sx={{ paddingTop: "24px" }}>
          <HeaderTypographyStyle>{t("Your Invite Link")}</HeaderTypographyStyle>
          <Box sx={{ display: "flex", gap: "11px" }}>
            <StyledInputBox>
              <StyledInput
                type="text"
                value={inviteText}
                onChange={(e) => setInviteText(e.target.value)}
              />
            </StyledInputBox>
            <StyledCopy onClick={copyToClipboard}>
              <img
                src={Copy}
                alt="Copy"
                style={{ width: "16px", height: "16px", cursor: "pointer" }}
              />
            </StyledCopy>
          </Box>
        </Box>
      </Box>
    </MainBox>
  );
};

export default Referal;
