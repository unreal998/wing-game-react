import { Box, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MAIN_COLORS } from "../../shared/colors";
import { TableBox } from "./components/TableBox";
import Male from "../../assets/Male.svg";
import { StyledHeader } from "./components/StyledHeader";
import { StyledReferalTypography } from "./components/StyledReferalTypography";
import { StyledMainJpg } from "./components/StyledMainJpg";
import { heightProportion } from "../../shared/utils";
import { InfoBox } from "../../shared/components/InfoBox";
import { useTranslation } from "react-i18next";
import { MainBox } from "../../shared/components/MainBox";
import { NamedStyled } from "../../shared/components/NameStyled";
import { StyledBasicBox } from "./components/StyledBasicBox";
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

import { ModuleNineHalfTen } from "../Tutorial/components/ModuleNineHalfTen";
import { setCurrentModule } from "../Tutorial/slices";
import { selectCurrentModule } from "../Tutorial/selectors";

import { useNavigate } from "react-router-dom";
import { clearSelectedCountry } from "../Home/slices";
import { updateBalanceAction } from "../Header/slices";

const commonImgStyle = { width: "20px", height: "20px", borderRadius: "52px" };

const Referal = () => {
  const loading = useSelector(selectReferalLoading);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const userData = useSelector(selectUserData());
  const referalData = useSelector(selectReferalData());
  const countries = useSelector(selectCountiresData());
  const [buyCountrieModalOpen, setBuyCountrieModalOpen] = useState(false);
  const currentModule = useSelector(selectCurrentModule());

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

  useEffect(() => {
    if (userData) {
      dispatch(getReferalDataAction(userData.telegramID));
      dispatch(updateBalanceAction(userData.id));
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

  const tableHeight = useMemo(() => heightProportion - 285, []);

  return (
    <>
      {(currentModule === 9 ||
        currentModule === 9.5 ||
        currentModule === 10) && (
        <Box
          onClick={() => {
            if (currentModule === 9) {
              dispatch(setCurrentModule(9.5));
            } else if (currentModule === 9.5) {
              dispatch(setCurrentModule(10));
            }
          }}
          width={"100vw"}
          height={"120vh"}
          position={"absolute"}
          zIndex={9}
          bgcolor={`rgba(0, 0, 0, 0.${currentModule === 9 ? "4" : "2"}3)`}
          top={"-1vh"}
          sx={{
            transition: "all 0.2s ease",
          }}
        >
          <ModuleNineHalfTen />
        </Box>
      )}
      <MainBox height={heightProportion} position={"relative"}>
        <LoaderComponent loading={loading} />
        <Box sx={{ display: "flex", gap: "15px", flexDirection: "column" }}>
          <NamedStyled>{t("Referal")}</NamedStyled>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <InfoBox value={`10%`} subtitle={t("Income")} />
            <InfoBox
              value={`${referalData.length}/${nextArea?.referalsToUnlock || 0}`}
              subtitle={t("Referrals")}
            />
          </Box>

          <StyledBasicBox
            height={`${tableHeight}px`}
            sx={{
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: `${MAIN_COLORS.mainGreen} transparent`,
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: MAIN_COLORS.mainGreen,
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
              },
            }}
          >
            <TableBox>
              {["User", "Level", "Coin"].map((item, index) => (
                <StyledHeader
                  key={index}
                  sx={{
                    flex: index === 0 ? 1.6 : 0.7,
                  }}
                >
                  <Typography sx={{ fontSize: "13px" }}>{t(item)}</Typography>
                </StyledHeader>
              ))}
            </TableBox>

            {referalData && referalData.length > 0 ? (
              referalData.map((user, index) => (
                <TableBox key={index}>
                  <StyledMainJpg sx={{ flex: 1.6 }}>
                    <img src={Male} alt="male" style={commonImgStyle} />
                    <StyledReferalTypography>
                      {user.userName || user.firstName || user.lastName || " "}
                    </StyledReferalTypography>
                  </StyledMainJpg>

                  {[user.lvl, user.WindBalance].map((value, idx) => (
                    <StyledReferalTypography
                      sx={
                        idx === 1
                          ? { color: MAIN_COLORS.mainGreen, fontWeight: "600" }
                          : {}
                      }
                      flex={0.7}
                    >
                      {value.toFixed(2)}
                    </StyledReferalTypography>
                  ))}
                </TableBox>
              ))
            ) : (
              <Typography sx={{ textAlign: "center", padding: "20px" }}>
                {t("No referrals yet")}
              </Typography>
            )}
          </StyledBasicBox>
        </Box>
        <BuyCountryModal
          open={buyCountrieModalOpen}
          onClose={() => setBuyCountrieModalOpen(false)}
          onBuy={handleBuyCountry}
        />
      </MainBox>
    </>
  );
};

export default Referal;
