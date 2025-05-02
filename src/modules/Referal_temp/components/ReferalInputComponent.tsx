import { Box } from "@mui/material";
import { HeaderTypographyStyle } from "./HeaderTypographyStyle";
import { StyledInputBox } from "./StyledInputBox";
import { StyledInput } from "./StyledInput";
import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../Header/selectors";
import Copy from "../../../assets/copy.svg";
import { useTranslation } from "react-i18next";

export const ReferalInputComponent = () => {
  const userData = useSelector(selectUserData());
  const { t } = useTranslation();

  const referalLink = useMemo(() => {
    let urlString = `https://t.me/WindGameAppWrapperBot?start=r_`;
    if (userData) {
      return `${urlString}${userData.telegramID}`;
    }
    return urlString;
  }, [userData]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(referalLink)
      .then(() => {
        console.log("Copied:", "");
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  }, [referalLink]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="12px"
      padding={"0 20px"}
      marginBottom="10px"
    >
      <HeaderTypographyStyle>{t("Your Invite Link")}</HeaderTypographyStyle>
      <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <StyledInputBox>
          <StyledInput type="text" value={referalLink} readOnly />
        </StyledInputBox>
        <img
          onClick={copyToClipboard}
          src={Copy}
          alt="Copy"
          style={{ width: "16px", height: "16px", cursor: "pointer" }}
        />
      </Box>
    </Box>
  );
};
