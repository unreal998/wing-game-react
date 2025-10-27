import { ModalComponent } from "../../../shared/components/ModalComponent";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectCountiresData, selectUserData } from "../../Header/selectors";
import { useMemo } from "react";
import { County } from "../../../shared/types";
import { PopUpMainButton } from "../../../shared/components/PopUpMainButton";

type Props = {
  open: boolean;
  onClose: () => void;
  countryName: string;
  onOpen: () => void;
};

export const countrieModsProfit = (
  selectedCountry: County | null | undefined,
) => {
  if (selectedCountry) {
    switch (selectedCountry.shortName) {
      case "dk":
        return 14;
      case "gr":
        return 17;
      case "usa":
        return 20;
      default:
        return 0;
    }
  }
  return 0;
};

export const LockedCountryModal: React.FC<Props> = ({
  open,
  onClose,
  countryName,
  onOpen,
}) => {
  const { t } = useTranslation();
  const userData = useSelector(selectUserData());
  const countries = useSelector(selectCountiresData());

  const selectedCountry = useMemo(() => {
    if (!countries) return null;
    return countries.find((country) => country.shortName === countryName);
  }, [countries, countryName]);

  const countriesForUnlock = useMemo(() => {
    if (selectedCountry && countries) {
      const countryIndex =
        countries.find(
          (country) => country.shortName === selectedCountry.shortName,
        )?.id || 1;
      const countriesForUnlock = userData?.areas.filter((area, index) => {
        return index < countryIndex - 1 && !area.bought && !area.available;
      });
      return countriesForUnlock;
    }
  }, [countries, selectedCountry, userData]);

  const countriesForUnlockNames = useMemo(() => {
    if (countriesForUnlock && countries) {
      const countriesNamesArray = countriesForUnlock.map((area) => {
        const countrieItem = countries.find(
          (country) => country.shortName === area.name,
        );
        return t(countrieItem?.title || "");
      });
      return countriesNamesArray.join(" ");
    }
    return "";
  }, [countriesForUnlock, countries]);

  const countriesForUnlockPrice = useMemo(() => {
    if (countriesForUnlock && countries) {
      const countriesPrice = countriesForUnlock.map((area) => {
        const countrieItem = countries.find(
          (country) => country.shortName === area.name,
        );
        return countrieItem?.unlockPrice || 0;
      });
      return countriesPrice.reduce((sum, price) => sum + price, 0);
    }
    return 0;
  }, [countriesForUnlock, countries]);

  return (
    <ModalComponent
      openModal={open}
      handleCloseModal={onClose}
      title={t("lockedCountryTitle")}
      subtitle={`
                ${t(selectedCountry?.title || "")} ${t("lockedCountryContent2")}: ${selectedCountry?.basicBonusPerClick} ${t("lockedCountryContent2.1")} ${t("lockedCountryContent2.2")}\n
                ${t("lockedCountryContent2.3")} ${countrieModsProfit(selectedCountry)}%
                `}
      contentAlign="left"
      additionalbutton={
        <PopUpMainButton onClick={onOpen}>{t("open")}</PopUpMainButton>
      }
    ></ModalComponent>
  );
};
