import React from "react";
import { useTranslation } from "react-i18next";
import { ModalComponent } from "./ModalComponent";
import { PopUpMainButton } from "./PopUpMainButton";

type Props = {
  open: boolean;
  onClose: () => void;
  onBuy: () => void;
};

const BuyCountryModal: React.FC<Props> = ({ open, onClose, onBuy }) => {
  const { t } = useTranslation();
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
