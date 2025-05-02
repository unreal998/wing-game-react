import React, { useMemo } from "react";
import { TableRow, Stack } from "@mui/material";
import { MAIN_COLORS } from "../../../shared/colors";
import { TableCellShop } from "./TableCellShop";
import { UserData } from "../../../shared/types";
import { useSelector } from "react-redux";
import { selectSelectedCountry } from "../../Home/selectors";

type ModificatorsTableProps = {
  modifiers: UserData["modifiers"] | undefined;
};

const ModificatorsTable: React.FC<ModificatorsTableProps> = ({ modifiers }) => {
  const selectedCountry = useSelector(selectSelectedCountry());

  const selectedCountryModifiers = useMemo(
    () => modifiers?.find((mod) => mod.areaName === selectedCountry.name),
    [modifiers, selectedCountry],
  );

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
        <TableCellShop>Energy Flow</TableCellShop>
        <TableCellShop>Clicks Remain</TableCellShop>
        <TableCellShop>Bought Date</TableCellShop>
      </TableRow>
      {selectedCountryModifiers?.boughtModifier &&
        selectedCountryModifiers?.boughtModifier.map((mod, index) => {
          return (
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
              <TableCellShop> {mod.clicksRemaining} clicks </TableCellShop>
              <TableCellShop>
                {new Date(mod.boughtDate || 0).toLocaleDateString()}
              </TableCellShop>
            </TableRow>
          );
        })}
    </Stack>
  );
};

export default ModificatorsTable;
