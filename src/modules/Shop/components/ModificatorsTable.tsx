import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
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
        backgroundColor: MAIN_COLORS.blockBG,
      }}
    >
      <Table sx={{ backgroundColor: MAIN_COLORS.blockBG }}>
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
                  {mod?.find((modifier) => modifier.speed !== 0)
                    ? mod?.map((modifier) => (
                        <Typography>
                          <span key={modifier.speed}>{modifier.speed}</span>
                          <br></br>
                        </Typography>
                      ))
                    : 0}
                </TableCell>
                <TableCell
                  sx={{
                    color: MAIN_COLORS.textColor,
                  }}
                >
                  {mod?.find((modifier) => modifier.clicksRemaining !== 0)
                    ? mod?.map((modifier) => (
                        <Typography>
                          <span key={modifier.speed}>
                            {modifier.clicksRemaining} clicks
                          </span>
                          <br></br>
                        </Typography>
                      ))
                    : 0}
                </TableCell>
                <TableCell sx={{ color: MAIN_COLORS.textColor }}>
                  {mod?.find(
                    (modifier) =>
                      modifier.boughtDate !== null &&
                      modifier.boughtDate !== undefined,
                  )
                    ? mod?.map((modifier) => (
                        <Typography>
                          <span key={modifier.speed}>
                            {new Date(
                              modifier.boughtDate || 0,
                            ).toLocaleDateString()}
                          </span>
                          <br></br>
                        </Typography>
                      ))
                    : "not bought yet"}
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
