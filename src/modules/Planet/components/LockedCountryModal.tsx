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
      const countryIndex = countries.findIndex(
        (country) => country.shortName === selectedCountry.shortName,
      );
      const countriesForUnlock = userData?.areas.filter((area, index) => {
        return index < countryIndex && !area.bought && !area.available;
      });
      return countriesForUnlock?.map((area) => {
        return t(
          countries.find((country) => country.shortName === area.name)?.title ||
            "",
        );
      });
    }
  }, [countries, selectedCountry, userData]);

  return (
    <ModalComponent
      openModal={open}
      handleCloseModal={onClose}
      title={t("lockedCountryTitle")}
      subtitle={`
                ${t("lockedCountryContent")}: ${(selectedCountry?.referalsToUnlock || 0) - (userData?.referals?.length || 0)} ${t("lockedCountryContent1")} ${t(selectedCountry?.title || "")}\n
                ${t(selectedCountry?.title || "")} ${t("lockedCountryContent2")}: ${selectedCountry?.basicBonusPerClick} ${t("lockedCountryContent2.1")} ${t("lockedCountryContent2.2")} 
                ${countriesForUnlock?.length ? `\n ${t("lockedCountryContent3")}: ${countriesForUnlock?.join(" ")} ${t("lockedCountryContent3.1")} ${t(selectedCountry?.title || "")}` : ""}`}
      contentAlign="left"
    ></ModalComponent>
  );
};
