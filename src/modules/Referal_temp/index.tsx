import { Box, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MAIN_COLORS } from "../../shared/colors";
import { TableBox } from "./components/TableBox";
import Male from "../../assets/Male.svg";
import { TableBoxHead } from "./components/TableBoxHead";
import { StyledHeader } from "./components/StyledHeader";
import { StyledMain } from "./components/StyledMain";
import { StyledMainColumn } from "./components/StyledMainColumn";
import { StyledMainTypography } from "./components/StyledMainTypography";
import { StyledMainJpg } from "./components/StyledMainJpg";
import Copy from "../../assets/copy.svg";
import { StyledCopy } from "./components/StyledCopy";
import { StyledInputBox } from "./components/StyledInputBox";
import { StyledInput } from "./components/StyledInput";
import { heightProportion } from "../../shared/utils";
import { InfoBox } from "../../shared/components/InfoBox";
import { useTranslation } from "react-i18next";
import { MainBox } from "../../shared/components/MainBox";
import { NamedStyled } from "../../shared/components/NameStyled";
import { StyledBasicBox } from "./components/StyledBasicBox";
import { HeaderTypographyStyle } from "./components/HeaderTypographyStyle";
import { useDispatch, useSelector } from "react-redux";
import { selectCountiresData, selectUserData } from "../Header/selectors";
import {
  buyCountry,
  getReferalDataAction,
  selectReferalLoading,
} from "./slices";
import { selectReferalData } from "./selectors";
import LoaderComponent from "../../shared/components/LoaderComponent";
import { AreaType } from "../../shared/types";
import BuyCountryModal from "../../shared/components/BuyCountry";
import { useNavigate } from "react-router-dom";
import { clearSelectedCountry } from "../Home/slices";

const commonImgStyle = { width: "33px", height: "33px", borderRadius: "52px" };

const Referal = () => {
  const loading = useSelector(selectReferalLoading);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userData = useSelector(selectUserData());
  const referalData = useSelector(selectReferalData());
  const countries = useSelector(selectCountiresData());
  const [buyCountrieModalOpen, setBuyCountrieModalOpen] = useState(false);

  const nextArea = useMemo(() => {
    if (!userData || !countries) return null;
    let nextOpenedCountry: AreaType | null = null;
    userData.areas.forEach((area, index) => {
      if (area.bought && area.available) {
        if (userData.areas[index + 1]) {
          if (
            !userData.areas[index + 1].bought ||
            !userData.areas[index + 1].available
          ) {
            nextOpenedCountry = userData.areas[index + 1];
          }
        } else {
          nextOpenedCountry = userData.areas[index];
        }
      }
    });
    if (nextOpenedCountry !== null) {
      return countries.find(
        (country) => country.shortName === (nextOpenedCountry as AreaType).name,
      );
    }
    return null;
  }, [userData, countries]);

  useEffect(() => {
    if (nextArea && referalData.length >= nextArea.referalsToUnlock) {
      setBuyCountrieModalOpen(true);
    }
  }, [nextArea, referalData.length, userData]);

  const dispatch = useDispatch();
  const referalLink = useMemo(() => {
    let urlString = `https://t.me/WindGameAppWrapperBot?start=r_`;
    if (userData) {
      return `${urlString}${userData.telegramID}`;
    }
    return urlString;
  }, [userData]);

  useEffect(() => {
    if (userData) {
      dispatch(getReferalDataAction(userData.telegramID));
    }
  }, [dispatch, userData]);

  const handleBuyCountry = useCallback(() => {
    if (nextArea && userData) {
      if (userData.TONBalance >= 1) {
        dispatch(
          buyCountry({ uid: userData?.id, countryName: nextArea.shortName }),
        );
        setBuyCountrieModalOpen(false);
        dispatch(clearSelectedCountry());
        navigate("/");
      }
    }
  }, [nextArea, userData, dispatch, navigate]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(referalLink)
      .then(() => {
        console.log("Copied:", "");
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  }, [referalLink]);

  const tableHeight = useMemo(() => heightProportion - 285, []);

  return (
    <MainBox height={heightProportion}>
      <LoaderComponent loading={loading} />
      <Box>
        <NamedStyled paddingBottom="8px">{t("Referal")}</NamedStyled>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <InfoBox
            value={`${referalData.length}/${nextArea?.referalsToUnlock || 0}`}
            subtitle={`to unlock next country`.toUpperCase()}
          />
        </Box>
        <StyledBasicBox height={`${tableHeight}px`}>
          <TableBox>
            {["User", "Level", "Coin"].map((item, index) => (
              <StyledHeader
                key={index}
                sx={{
                  flex: index === 0 ? 1.6 : 0.7,
                  paddingLeft: index === 0 ? "5px" : "0",
                }}
              >
                <TableBoxHead>
                  <Typography sx={{ fontSize: "12px" }}>{t(item)}</Typography>
                </TableBoxHead>
              </StyledHeader>
            ))}
          </TableBox>

          {referalData && referalData.length > 0 ? (
            referalData.map((user, index) => (
              <TableBox key={index}>
                <StyledMain>
                  <StyledMainJpg>
                    <img src={Male} alt="male" style={commonImgStyle} />
                    <StyledMainTypography>
                      {user.userName || user.firstName || user.lastName || " "}
                    </StyledMainTypography>
                  </StyledMainJpg>
                </StyledMain>

                {[user.lvl, user.WindBalance].map((value, idx) => (
                  <StyledMainColumn key={idx}>
                    <StyledMainTypography
                      sx={idx === 1 ? { color: MAIN_COLORS.gold } : {}}
                    >
                      {value}
                    </StyledMainTypography>
                  </StyledMainColumn>
                ))}
              </TableBox>
            ))
          ) : (
            <Typography sx={{ textAlign: "center", padding: "20px" }}>
              {t("No referrals yet")}
            </Typography>
          )}
        </StyledBasicBox>

        <Box sx={{ paddingTop: "24px" }}>
          <HeaderTypographyStyle>{t("Your Invite Link")}</HeaderTypographyStyle>
          <Box sx={{ display: "flex", gap: "11px" }}>
            <StyledInputBox>
              <StyledInput type="text" value={referalLink} readOnly />
            </StyledInputBox>
            <StyledCopy onClick={copyToClipboard}>
              <img
                src={Copy}
                alt="Copy"
                style={{ width: "16px", height: "16px", cursor: "pointer" }}
              />
            </StyledCopy>
          </Box>
        </Box>
      </Box>
      <BuyCountryModal
        open={buyCountrieModalOpen}
        onClose={() => setBuyCountrieModalOpen(false)}
        onBuy={handleBuyCountry}
      />
    </MainBox>
  );
};

export default Referal;
