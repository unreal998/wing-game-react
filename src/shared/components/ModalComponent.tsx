import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { ModalStyled } from "./ModalStyled";
import { useTranslation } from "react-i18next";
import { MAIN_COLORS } from "../colors";
import { ReactNode } from "react";
import { GameButtonComponent } from "./GameButtonComponent";

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
      <Stack
        sx={{
          backgroundColor: MAIN_COLORS.sectionBG,
          borderRadius: "8px",
          padding: "12px",
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent>
          <Typography
            style={{
              color: "white",
              textAlign: "center",
            }}
          >
            {subtitle}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          {additionalbutton}
          <GameButtonComponent
            onClick={handleCloseModal}
            sx={{ color: "white" }}
          >
            {t("Close")}
          </GameButtonComponent>
        </DialogActions>
      </Stack>
    </ModalStyled>
  );
};
