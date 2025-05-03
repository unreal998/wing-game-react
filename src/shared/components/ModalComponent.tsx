import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { ModalStyled } from "./ModalStyled";
import { useTranslation } from "react-i18next";
import { MAIN_COLORS } from "../colors";
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
      <Stack
        sx={{
          backgroundColor: MAIN_COLORS.sectionBG,
          borderRadius: "8px",
          padding: "8px",
          gap: "10px",
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
            color: "white",
            padding: "10px",
            lineHeight: "1.3",
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent
          sx={{
            padding: "10px",
            lineHeight: "1.3",
            color: "white",
            overflowX: "hidden",
            width: "91%",
            lineBreak: "anywhere",
          }}
        >
          {subtitle}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          {additionalbutton}
          <Button
            sx={{
              border: `1px solid ${MAIN_COLORS.mainGreen}`,
              color: "white",
              backgroundColor: `${MAIN_COLORS.blockBG}`,
              padding: "10px 20px",
            }}
            onClick={handleCloseModal}
          >
            {t("Close")}
          </Button>
        </DialogActions>
      </Stack>
    </ModalStyled>
  );
};
