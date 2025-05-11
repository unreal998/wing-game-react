import React from "react";
import { useTranslation } from "react-i18next";
import footerButtonSound from "../../assets/sounds/footerButton.mp3";
import useSound from "use-sound";
import { ModalComponent } from "./ModalComponent";
import { PopUpMainButton } from "./PopUpMainButton";

type Props = {
  open: boolean;
  onClose: () => void;
  onBuy: () => void;
};

const BuyCountryModal: React.FC<Props> = ({ open, onClose, onBuy }) => {
  const { t } = useTranslation();
  const [playFooterSound] = useSound(footerButtonSound);
  return (
    <ModalComponent
      openModal={open}
      handleCloseModal={onClose}
      title={t("doYouWhantToBuy")}
      subtitle={t("newOpportunities")}
      additionalbutton={
        <PopUpMainButton onClick={onBuy}>{t("buy")} (1 TON)</PopUpMainButton>
      }
    />
  );
};

export default BuyCountryModal;
