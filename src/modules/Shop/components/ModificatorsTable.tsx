import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
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
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: "250px",
        border: `1px solid ${MAIN_COLORS.activeTabColor}`,
        backgroundColor: MAIN_COLORS.headerBG,
      }}
    >
      <Table sx={{ backgroundColor: MAIN_COLORS.headerBG }}>
        <TableHead>
          <TableRow>
            <TableCellShop>#</TableCellShop>
            <TableCellShop>Wind Speed</TableCellShop>
            <TableCellShop>Clicks Remain</TableCellShop>
            <TableCellShop>Bought Date</TableCellShop>
          </TableRow>
        </TableHead>
        <TableBody>
          {[selectedCountryModifiers?.boughtModifier].map((mod, index) => {
            return (
              <TableRow key={index}>
                <TableCell sx={{ color: MAIN_COLORS.textColor }}>
                  {index}
                </TableCell>
                <TableCell sx={{ color: MAIN_COLORS.textColor }}>
                  {mod?.speed}
                </TableCell>
                <TableCell sx={{ color: MAIN_COLORS.textColor }}>
                  {mod?.clicksRemaining}
                </TableCell>
                <TableCell sx={{ color: MAIN_COLORS.textColor }}>
                  {new Date(mod?.boughtDate || 0).toLocaleDateString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ModificatorsTable;
