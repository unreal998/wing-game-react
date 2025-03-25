import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ModalStyled } from "./ModalStyled";
import { useTranslation } from "react-i18next";
import { MAIN_COLORS } from "../colors";
import { StyledButtonGame } from "../../modules/Planet/components/StyledButtonGame";
import { ReactNode } from "react";

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
  return (
    <ModalStyled open={openModal} onClose={handleCloseModal}>
      <DialogTitle
        sx={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
          padding: "0px",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <p
          style={{
            textAlign: "center",
            fontSize: "1.2rem",
            fontFamily: "sans-serif",
          }}
        >
          {subtitle}
        </p>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        {additionalbutton}
        <StyledButtonGame
          onClick={handleCloseModal}
          sx={{ color: MAIN_COLORS.textColor }}
        >
          {t("Close")}
        </StyledButtonGame>
      </DialogActions>
    </ModalStyled>
  );
};
