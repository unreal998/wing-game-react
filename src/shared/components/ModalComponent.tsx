import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ModalStyled } from "./ModalStyled";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";
import footerButtonSound from "../../assets/sounds/footerButton.mp3";
import useSound from "use-sound";
import { PopUpSeccondaryButton } from "./PopUpSeccondaryButton";
import { MAIN_COLORS } from "../colors";

type ModalComponentPropsType = {
  openModal: boolean;
  handleCloseModal: () => void;
  title: string;
  subtitle: string;
  additionalbutton?: ReactNode;
};

export const ModalComponent = ({
  openModal,
  handleCloseModal,
  title,
  subtitle,
  additionalbutton,
}: ModalComponentPropsType) => {
  const { t } = useTranslation();
  const [playFooterSound] = useSound(footerButtonSound);
  return (
    <ModalStyled
      open={openModal}
      onClose={handleCloseModal}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: MAIN_COLORS.sectionBG,
          padding: "24px 12px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "85%",
          alignItems: "center",
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "700",
          color: "white",
          padding: "0",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          padding: 0,
          lineHeight: "1.3",
          color: "white",
          overflowX: "hidden",
          width: "91%",
          lineBreak: "normal",
        }}
      >
        {subtitle}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <PopUpSeccondaryButton onClick={handleCloseModal}>
          {t("Close")}
        </PopUpSeccondaryButton>
        {additionalbutton}
      </DialogActions>
    </ModalStyled>
  );
};
