import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MainBox } from "../../shared/components/MainBox";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedCountry } from "../Home/selectors";
import LoaderComponent from "../../shared/components/LoaderComponent";
import { heightProportion } from "../../shared/utils";
import { selectInvestitionsData, selectInvestitionsLoading } from "./selectors";
import { getInvestitionsDataAction } from "./slice";
import { selectUserData } from "../Header/selectors";
import { Stack, Typography } from "@mui/material";
import { TableCellShop } from "../Shop/components/TableCellShop";
import { MAIN_COLORS } from "../../shared/colors";

const Investitions = () => {
  const { t } = useTranslation();

  const loading = useSelector(selectInvestitionsLoading());
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData());
  const selectedCountry = useSelector(selectSelectedCountry());
  const investitionsData = useSelector(selectInvestitionsData());

  useEffect(() => {
    if (userData?.telegramID && selectedCountry.name) {
      dispatch(
        getInvestitionsDataAction({
          tid: userData.telegramID,
          selectedCountry: selectedCountry.name,
        }),
      );
    }
  }, [dispatch]);

  const tableHeight = useMemo(() => heightProportion - 280, []);

  return (
    <MainBox
      position={"relative"}
      sx={{
        gap: "10px",
      }}
    >
      <LoaderComponent loading={loading} />
      <Typography variant="h5">{t("Investitions")}</Typography>
      <Stack
        sx={{
          backgroundColor: MAIN_COLORS.blockBG,
          padding: "8px",
          borderRadius: "12px",
          gap: "8px",
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            backgroundColor: MAIN_COLORS.sectionBG,
            borderRadius: "8px",
            padding: "8px",
          }}
        >
          <TableCellShop sx={{ width: "25px" }}>#</TableCellShop>
          <TableCellShop sx={{ width: "58px" }}>{t("Amount")}</TableCellShop>
          <TableCellShop sx={{ width: "60px" }}>{t("Currency")}</TableCellShop>
          <TableCellShop sx={{ width: "90px" }}>
            {t("Clicks Remain")}
          </TableCellShop>
          <TableCellShop sx={{ width: "90px" }}>
            {t("Investition Time")}
          </TableCellShop>
        </Stack>

        <Stack
          sx={{
            height: `${tableHeight}px`,
            overflowY: "auto",
            gap: "5px",
            pr: "6px",
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: MAIN_COLORS.mainGreen,
              borderRadius: "4px",
            },
            "@media (max-height: 667px)": {
              height: "135px",
              gap: "5px",
            },
          }}
        >
          {investitionsData && investitionsData.length > 0 ? (
            investitionsData.map((investition, index) => (
              <Stack
                key={index}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  backgroundColor: MAIN_COLORS.sectionBG,
                  borderRadius: "8px",
                  padding: "8px",
                }}
              >
                <TableCellShop sx={{ width: "25px" }}>
                  {index + 1}
                </TableCellShop>
                <TableCellShop sx={{ width: "58px" }}>
                  {investition.amount}
                </TableCellShop>
                <TableCellShop sx={{ width: "60px" }}>
                  {investition.currency}
                </TableCellShop>
                <TableCellShop sx={{ width: "90px" }}>
                  {investition.clicksRemaining}
                </TableCellShop>
                <TableCellShop sx={{ width: "90px" }}>
                  {new Date(
                    investition.investitionTime || 0,
                  ).toLocaleDateString()}
                </TableCellShop>
              </Stack>
            ))
          ) : (
            <Typography textAlign="center" mt={2} width="100%">
              {t("No investitions yet")}
            </Typography>
          )}
        </Stack>
      </Stack>
    </MainBox>
  );
};

export default Investitions;
