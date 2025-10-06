import { Stack, Typography } from "@mui/material";
import {
  selectLoadingUserReferalData,
  selectUserReferalData,
} from "../selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getUserReferalDataAction } from "../slices";
import { selectUserData } from "../../Header/selectors";
import { useTranslation } from "react-i18next";
import { MAIN_COLORS } from "../../../shared/colors";
import LoaderComponent from "../../../shared/components/LoaderComponent";

export const ReferalsByLevelInfoModal = () => {
  const userReferalData = useSelector(selectUserReferalData());
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData());
  const loadingUserReferalData = useSelector(selectLoadingUserReferalData());
  const { t } = useTranslation();

  useEffect(() => {
    if (userData) {
      dispatch(getUserReferalDataAction(userData.telegramID));
    }
  }, [dispatch, userData]);

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

  const referalsByLevelIncome = useMemo(() => {
    if (!userReferalData) return [];
    let usersIncomeByLevel = {
      1: {
        kwtIncome: 0,
        tonIncome: 0,
        count: 0,
      },
      2: {
        kwtIncome: 0,
        tonIncome: 0,
        count: 0,
      },
      3: {
        kwtIncome: 0,
        tonIncome: 0,
        count: 0,
      },
      4: {
        kwtIncome: 0,
        tonIncome: 0,
        count: 0,
      },
      5: {
        kwtIncome: 0,
        tonIncome: 0,
        count: 0,
      },
    };
    Object.values(userReferalData).forEach((user) => {
      user.forEach((userData) => {
        usersIncomeByLevel[
          (userData.level ?? 1) as keyof typeof usersIncomeByLevel
        ].kwtIncome += userData.rewardFromClicks;
        usersIncomeByLevel[
          (userData.level ?? 1) as keyof typeof usersIncomeByLevel
        ].tonIncome += userData.TONRewardFromClicks;
        usersIncomeByLevel[
          (userData.level ?? 1) as keyof typeof usersIncomeByLevel
        ].count += 1;
      });
    });
    return usersIncomeByLevel;
  }, [userReferalData]);
  return (
    <Stack gap={1}>
      {referalsByLevelIncome && !loadingUserReferalData && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography flex={0.25}>{t("Level")}</Typography>
          <Typography flex={0.25}>{t("Count")}</Typography>
          <Typography flex={0.25}>{t("kW")}</Typography>
          <Typography flex={0.25}>{t("TON")}</Typography>
        </Stack>
      )}

      {referalsByLevelIncome &&
        !loadingUserReferalData &&
        Object.entries(referalsByLevelIncome).map(([level, income]) => (
          <Stack
            key={level}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            color={getColor(Number(level) - 1)}
          >
            <Typography flex={0.25}>{level}</Typography>
            <Typography flex={0.25}>{income.count}</Typography>
            <Typography flex={0.25}>{income.kwtIncome.toFixed(0)}</Typography>
            <Typography flex={0.25}>{income.tonIncome.toFixed(3)}</Typography>
          </Stack>
        ))}
      <LoaderComponent loading={loadingUserReferalData} />
    </Stack>
  );
};
