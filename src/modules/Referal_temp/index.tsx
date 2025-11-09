import { Box, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { getReferalDataAction, selectReferalLoading } from "./slices";
import {
  selectReferalData,
  selectChildrenByParent,
  selectLoadingByParent,
} from "./selectors";
import LoaderComponent from "../../shared/components/LoaderComponent";
import { AreaType } from "../../shared/types";
import { updateBalanceAction } from "../Header/slices";
import { ReferalData } from "./types";
import { ModalComponent } from "../../shared/components/ModalComponent";
import { ReferalsByLevelInfoModal } from "./components/UserReferalInfoModal";

const commonImgStyle = { width: "20px", height: "20px", borderRadius: "52px" };

const LEVEL_BONUSES_KWT = [0.1, 0.08, 0.06, 0.04, 0.02];
const LEVEL_BONUSES_TON = [0.07, 0.05, 0.03, 0.02, 0.01];

const MAX_LEVEL = 5;

const levelDisplayMultiplierKWT = (level: number) => {
  if (level <= 0) return 1;
  const base = LEVEL_BONUSES_KWT[0] ?? 0;
  const b = LEVEL_BONUSES_KWT[level] ?? 0;
  return base > 0 ? b / base : 0;
};

const levelDisplayMultiplierTON = (level: number) => {
  if (level <= 0) return 1;
  const base = LEVEL_BONUSES_TON[0] ?? 0;
  const b = LEVEL_BONUSES_TON[level] ?? 0;
  return base > 0 ? b / base : 0;
};

const Referal = () => {
  const loading = useSelector(selectReferalLoading);
  const { t } = useTranslation();
  const userData = useSelector(selectUserData());
  const referalData = useSelector(selectReferalData());
  const countries = useSelector(selectCountiresData());
  const childrenByParent = useSelector(selectChildrenByParent());
  const loadingByParent = useSelector(selectLoadingByParent());
  const [isReferalInfoOpen, setIsReferalInfoOpen] = useState(false);
  const [isUserReferalInfoOpen, setIsUserReferalInfoOpen] = useState(false);

  const [expandedTids, setExpandedTids] = useState<Set<string>>(new Set());

  const nextArea = useMemo(() => {
    if (!userData || !countries) return null;
    let nextOpenedCountry: AreaType | null = null;
    userData.areas.forEach((area, index) => {
      if (area.available) {
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

  const tableHeight = useMemo(() => heightProportion - 300, []);

  const toggleExpand = useCallback(
    (tid: number | string, hasChildrenHint?: boolean) => {
      const key = String(tid);
      setExpandedTids((prev) => {
        const next = new Set(prev);
        if (next.has(key)) {
          next.delete(key);
        } else {
          next.add(key);
          const notLoaded = !childrenByParent[key];
          if (notLoaded && hasChildrenHint) {
            dispatch({
              type: "referalSlice/getReferalChildrenAction",
              payload: key,
            });
          }
        }
        return next;
      });
    },
    [dispatch, childrenByParent],
  );

  const getColor = (level: number) => {
    switch (level) {
      case 0:
        return "#3dcdeaff";
      case 1:
        return "#44d97dff";
      case 2:
        return "#3f3ceaff";
      case 3:
        return "#9514ffff";
      case 4:
        return "#e22bb1ff";
      default:
        return MAIN_COLORS.mainGreen;
    }
  };

  const ReferralNode: React.FC<{ user: ReferalData; level: number }> = ({
    user,
    level,
  }) => {
    const tid = String(user.telegramID);
    const isExpanded = expandedTids.has(tid);
    const children = childrenByParent[tid] ?? [];
    const isLoading = !!loadingByParent[tid];

    const hasChildren =
      (Array.isArray(user.referals) && user.referals.length > 0) ||
      children.length > 0;

    const multKWT = levelDisplayMultiplierKWT(level);
    const multTon = levelDisplayMultiplierTON(level);
    const coinShown = (user.rewardFromClicks * multKWT).toFixed(2);
    const tonShown = (user.TONRewardFromClicks * multTon).toFixed(2);

    return (
      <Stack
        alignItems={"center"}
        width={"100%"}
        position="relative"
        gap={"5px"}
      >
        <TableBox
          onClick={() =>
            hasChildren &&
            level + 1 < MAX_LEVEL &&
            toggleExpand(tid, hasChildren)
          }
          sx={{ border: `2px solid ${getColor(level)}` }}
          width="93%"
        >
          <StyledMainJpg sx={{ flex: 1.6, pl: `${level * 8}px` }}>
            <img src={Male} alt="male" style={commonImgStyle} />
            <StyledReferalTypography>
              {user.userName || user.firstName || user.lastName || " "}
            </StyledReferalTypography>
          </StyledMainJpg>

          <StyledReferalTypography flex={0.7}>
            {Math.floor(LEVEL_BONUSES_KWT[level] * +coinShown * 1000) / 1000}
          </StyledReferalTypography>

          <StyledReferalTypography
            sx={{ color: MAIN_COLORS.mainGreen, fontWeight: "600" }}
            flex={0.7}
          >
            {Math.floor(LEVEL_BONUSES_TON[level] * +tonShown * 1000) / 1000}
          </StyledReferalTypography>

          {hasChildren && level + 1 < MAX_LEVEL && (
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
                sx={{ transform: isExpanded ? "rotate(180deg)" : "" }}
              />
            </Box>
          )}
        </TableBox>

        {isExpanded && level + 1 < MAX_LEVEL && (
          <>
            {isLoading && (
              <Box sx={{ py: 1 }}>
                <LoaderComponent loading />
              </Box>
            )}
            {!isLoading &&
              children.map((child) => (
                <ReferralNode
                  key={child.telegramID}
                  user={child}
                  level={level + 1}
                />
              ))}
          </>
        )}
      </Stack>
    );
  };

  return (
    <MainBox height={heightProportion} position={"relative"}>
      <LoaderComponent loading={loading} />
      <Box sx={{ display: "flex", gap: "15px", flexDirection: "column" }}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          gap="10px"
          alignItems="center"
        >
          <NamedStyled>{t("Referal")}</NamedStyled>
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <InfoBox
            value={`${referalData.length}`}
            subtitle={`${t("Referrals")}\n ${t("referralInfoSubtitle")}`}
            onClick={() => setIsUserReferalInfoOpen(true)}
          />
          <InfoBox
            value={`${t("referalInfoButton")}`}
            subtitle={t("referralInfoSubtitle")}
            onClick={() => setIsReferalInfoOpen(true)}
          />
        </Box>

        <StyledBasicBox
          height={`${tableHeight}px`}
          sx={{
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: `${MAIN_COLORS.mainGreen} transparent`,
            "&::-webkit-scrollbar": { width: "8px" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: MAIN_COLORS.mainGreen,
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
          }}
        >
          <TableBox>
            {["User", "Coin", "TON"].map((item, index) => (
              <StyledHeader key={index} sx={{ flex: index === 0 ? 1.6 : 0.7 }}>
                <Typography sx={{ fontSize: "12px" }}>{t(item)}</Typography>
              </StyledHeader>
            ))}
          </TableBox>

          {referalData && referalData.length > 0 ? (
            referalData.map((user) => (
              <ReferralNode key={user.telegramID} user={user} level={0} />
            ))
          ) : (
            <Typography sx={{ textAlign: "center", padding: "20px" }}>
              {t("No referrals yet")}
            </Typography>
          )}
        </StyledBasicBox>
        <ModalComponent
          openModal={isReferalInfoOpen}
          title={t("referalInfoTitle")}
          subtitle={
            <Stack gap={1} justifyContent={"flex-start"}>
              <Typography>{t("referalInfoIncome")}</Typography>
              <Typography sx={{ color: "#3dcdeaff" }}>
                {t("referralInfoIncomeLevel1")}
              </Typography>
              <Typography sx={{ color: "#44d97dff" }}>
                {t("referralInfoIncomeLevel2")}
              </Typography>
              <Typography sx={{ color: "#3f3ceaff" }}>
                {t("referralInfoIncomeLevel3")}
              </Typography>
              <Typography sx={{ color: "#9514ffff" }}>
                {t("referralInfoIncomeLevel4")}
              </Typography>
              <Typography sx={{ color: "#e22bb1ff" }}>
                {t("referralInfoIncomeLevel5")}
              </Typography>
              <Typography>{t("referalInfoIncome2")}</Typography>
            </Stack>
          }
          handleCloseModal={() => {
            setIsReferalInfoOpen(false);
          }}
        />
        <ModalComponent
          openModal={isUserReferalInfoOpen}
          title={t("userReferalInfoTitle")}
          subtitle={<ReferalsByLevelInfoModal />}
          handleCloseModal={() => {
            setIsUserReferalInfoOpen(false);
          }}
        />
      </Box>
    </MainBox>
  );
};

export default Referal;
