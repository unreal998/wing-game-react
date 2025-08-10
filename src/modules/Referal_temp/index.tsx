import { Box, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo } from "react";
import { MAIN_COLORS } from "../../shared/colors";
import { TableBox } from "./components/TableBox";
import Male from "../../assets/Male.svg";
import { StyledHeader } from "./components/StyledHeader";
import { StyledReferalTypography } from "./components/StyledReferalTypography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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
  getReferalDataAction,
  getSubReferalData,
  selectReferalLoading,
} from "./slices";
import {
  selectReferalData,
  selectSelectedSubReferalId,
  selectSubReferalData,
} from "./selectors";
import LoaderComponent from "../../shared/components/LoaderComponent";
import { AreaType } from "../../shared/types";
import { updateBalanceAction } from "../Header/slices";

const commonImgStyle = { width: "20px", height: "20px", borderRadius: "52px" };

const Referal = () => {
  const loading = useSelector(selectReferalLoading);

  const { t } = useTranslation();
  const userData = useSelector(selectUserData());
  const referalData = useSelector(selectReferalData());
  const countries = useSelector(selectCountiresData());
  const subReferalData = useSelector(selectSubReferalData());
  const selectedSubReferalId = useSelector(selectSelectedSubReferalId());

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

  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      dispatch(getReferalDataAction(userData.telegramID));
      dispatch(updateBalanceAction(userData.id));
    }
  }, [dispatch, userData]);

  const handleSubReferals = useCallback(
    (telegramID: number) => {
      dispatch(getSubReferalData(telegramID));
    },
    [dispatch],
  );

  const tableHeight = useMemo(() => heightProportion - 270, []);

  return (
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
            {["User", "Coin", "TON"].map((item, index) => (
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
              <Stack alignItems={"center"} width={"100%"} position="relative">
                <TableBox
                  onClick={() =>
                    user.referals.length > 0 &&
                    handleSubReferals(
                      user.telegramID === selectedSubReferalId
                        ? 0
                        : user.telegramID,
                    )
                  }
                  width="93%"
                  key={index}
                >
                  <StyledMainJpg sx={{ flex: 1.6 }}>
                    <img src={Male} alt="male" style={commonImgStyle} />
                    <StyledReferalTypography>
                      {user.userName || user.firstName || user.lastName || " "}
                    </StyledReferalTypography>
                  </StyledMainJpg>

                  {[user.rewardFromClicks, user.TONRewardFromClicks].map(
                    (value, idx) => (
                      <StyledReferalTypography
                        sx={
                          idx === 1
                            ? {
                                color: MAIN_COLORS.mainGreen,
                                fontWeight: "600",
                              }
                            : {}
                        }
                        flex={0.7}
                      >
                        {value.toFixed(2)}
                      </StyledReferalTypography>
                    ),
                  )}
                  {user.referals.length > 0 && (
                    <Box
                      sx={{
                        width: "24px",
                        height: "24px",
                        position: "absolute",
                        right: "7px",
                        top: "6px",
                      }}
                    >
                      <KeyboardArrowDownIcon
                        sx={{
                          transform:
                            selectedSubReferalId === user.telegramID
                              ? "rotate(180deg)"
                              : "",
                        }}
                      />
                    </Box>
                  )}
                </TableBox>
                <Box
                  sx={{
                    display:
                      selectedSubReferalId === user.telegramID
                        ? "block"
                        : "none",
                    backgroundColor: MAIN_COLORS.sectionBG,
                    width: "95%",
                    marginTop: "5px",
                  }}
                >
                  {subReferalData.map((user, index) => (
                    <TableBox key={index}>
                      <StyledMainJpg sx={{ flex: 1.6 }}>
                        <img src={Male} alt="male" style={commonImgStyle} />
                        <StyledReferalTypography>
                          {user.userName ||
                            user.firstName ||
                            user.lastName ||
                            " "}
                        </StyledReferalTypography>
                      </StyledMainJpg>

                      {[user.rewardFromClicks, user.TONRewardFromClicks].map(
                        (value, idx) => (
                          <StyledReferalTypography
                            sx={
                              idx === 1
                                ? {
                                    color: MAIN_COLORS.mainGreen,
                                    fontWeight: "600",
                                  }
                                : {}
                            }
                            flex={0.7}
                          >
                            {(value / 2).toFixed(2)}
                          </StyledReferalTypography>
                        ),
                      )}
                    </TableBox>
                  ))}
                </Box>
              </Stack>
            ))
          ) : (
            <Typography sx={{ textAlign: "center", padding: "20px" }}>
              {t("No referrals yet")}
            </Typography>
          )}
        </StyledBasicBox>
      </Box>
    </MainBox>
  );
};

export default Referal;
