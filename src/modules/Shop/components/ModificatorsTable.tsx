import React, { useMemo } from "react";
import { TableRow, Stack, Typography } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";
import { TableCellShop } from "./TableCellShop";
import { UserData } from "../../../shared/types";
import { useSelector } from "react-redux";
import { selectSelectedCountry } from "../../Home/selectors";
import { useTranslation } from "react-i18next";

type ModificatorsTableProps = {
  modifiers: UserData["modifiers"] | undefined;
};

const ModificatorsTable: React.FC<ModificatorsTableProps> = ({ modifiers }) => {
  const selectedCountry = useSelector(selectSelectedCountry());
  const { t } = useTranslation();

  const selectedCountryModifiers = useMemo(
    () => modifiers?.find((mod) => mod.areaName === selectedCountry.name),
    [modifiers, selectedCountry]
  );

  const bought = selectedCountryModifiers?.boughtModifier || [];

  return (
    <Stack
      sx={{
        backgroundColor: MAIN_COLORS.blockBG,
        padding: "8px",
        borderRadius: "12px",
        gap: "8px",
      }}
    >
      <TableRow
        sx={{
          backgroundColor: MAIN_COLORS.sectionBG,
          borderRadius: "8px",
        }}
      >
        <TableCellShop>#</TableCellShop>
        <TableCellShop>{t("Energy Flow")}</TableCellShop>
        <TableCellShop>{t("Clicks Remain")}</TableCellShop>
        <TableCellShop>{t("Bought Date")}</TableCellShop>
      </TableRow>

      {bought.length > 0 ? (
        bought.map((mod, index) => (
          <TableRow
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: MAIN_COLORS.sectionBG,
              borderRadius: "8px",
            }}
          >
            <TableCellShop>{index + 1}</TableCellShop>
            <TableCellShop>{mod.speed}</TableCellShop>
            <TableCellShop>{mod.clicksRemaining} clicks</TableCellShop>
            <TableCellShop>
              {new Date(mod.boughtDate || 0).toLocaleDateString()}
            </TableCellShop>
          </TableRow>
        ))
      ) : (
        <Typography textAlign="center" mt={2} width="100%">
          {t("No bought modifiers yet")}
        </Typography>
      )}
    </Stack>
  );
};

export default ModificatorsTable;
