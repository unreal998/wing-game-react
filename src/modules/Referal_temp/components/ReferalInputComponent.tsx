import { Box, Snackbar } from "@mui/material";
import { HeaderTypographyStyle } from "./HeaderTypographyStyle";
import { StyledInputBox } from "./StyledInputBox";
import { StyledInput } from "./StyledInput";
import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../Header/selectors";
import Copy from "../../../assets/copy.svg";
import Checkmark from "../../../assets/checkmark.png";
import { useTranslation } from "react-i18next";
import { MAIN_COLORS } from "../../../shared/colors";

export const ReferalInputComponent = () => {
  const userData = useSelector(selectUserData());
  const { t } = useTranslation();
  const [isClicked, setIsClicked] = useState(false);

  const referalLink = useMemo(() => {
    let urlString = `https://t.me/TurbinexAppBot?start=r_`;
    if (userData) {
      return `${urlString}${userData.telegramID}`;
    }
    return urlString;
  }, [userData]);

  const throttleMarkIcon = useCallback(() => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 3000);
  }, []);

  const copyToClipboard = useCallback(() => {
    throttleMarkIcon();
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
      <Box
        sx={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
          position: "relative",
        }}
      >
        <StyledInputBox>
          <StyledInput type="text" value={referalLink} readOnly />
        </StyledInputBox>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          key={`bottom-right-${isClicked}`}
          open={isClicked}
          autoHideDuration={3000}
          onClose={() => setIsClicked(false)}
          message={t("Copied" + " !")}
          sx={{
            "&.MuiSnackbar-root": {
              width: "100px",
              left: "auto",
              position: "absolute",
              bottom: "30px",
              right: "-40px",
              "& .MuiSnackbarContent-root": {
                fontSize: "14px",
                fontWeight: 700,
                borderRadius: "8px",
                padding: "0px 18px",
                width: "100px",
                backgroundColor: "transparent",
                color: "white",
                "& .MuiSnackbarContent-message": {
                  color: MAIN_COLORS.mainGreen,
                },
              },
            },
          }}
        />
        <img
          onClick={copyToClipboard}
          src={isClicked ? Checkmark : Copy}
          alt="Copy"
          style={{
            width: "16px",
            height: "16px",
            cursor: "pointer",
            filter: isClicked ? "brightness(1.5)" : "brightness(1)",
          }}
        />
      </Box>
    </Box>
  );
};
