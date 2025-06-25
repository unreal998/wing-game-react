import React from "react";
import { useTranslation } from "react-i18next";
import { ModalComponent } from "./ModalComponent";
import { PopUpMainButton } from "./PopUpMainButton";

type Props = {
  open: boolean;
  onClose: () => void;
  onBuy: () => void;
  price: number;
};

const BuyCountryModal: React.FC<Props> = ({ open, onClose, onBuy, price }) => {
  const { t } = useTranslation();
  return (
    <ModalComponent
      openModal={open}
      handleCloseModal={onClose}
      title={t("doYouWhantToBuy")}
      subtitle={t("newOpportunities")}
      additionalbutton={
        <PopUpMainButton onClick={onBuy}>
          {t("buy")} ({price.toString()} TON)
        </PopUpMainButton>
      }
    />
  );
};

export default BuyCountryModal;
