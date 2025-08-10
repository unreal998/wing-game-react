import { ModalComponent } from "../../../shared/components/ModalComponent";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectCountiresData, selectUserData } from "../../Header/selectors";
import { useMemo } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  countryName: string;
};

export const LockedCountryModal: React.FC<Props> = ({
  open,
  onClose,
  countryName,
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
                ${t("lockedCountryContent")}: ${(selectedCountry?.referalsToUnlock || 0) - (userData?.referals?.length || 0)} ${t("lockedCountryContent1")} ${t(selectedCountry?.title || "")}\n
                ${t(selectedCountry?.title || "")} ${t("lockedCountryContent2")}: ${selectedCountry?.basicBonusPerClick} ${t("lockedCountryContent2.1")} ${t("lockedCountryContent2.2")} 
                ${countriesForUnlockNames ? `\n ${t("lockedCountryContent3")}: ${countriesForUnlockNames} ${t("lockedCountryContent3.1")} ${t(selectedCountry?.title || "")} ${t("for")} ${countriesForUnlockPrice} TON` : ""}`}
      contentAlign="left"
    ></ModalComponent>
  );
};
