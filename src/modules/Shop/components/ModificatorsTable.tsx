import React from "react";
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

type ModificatorsTableProps = {
  modifiers: UserData["modifiers"] | undefined;
};

const ModificatorsTable: React.FC<ModificatorsTableProps> = ({ modifiers }) => {
  function formatDateToMonthDay(timestamp: number) {
    const date = new Date(timestamp * (timestamp < 1e12 ? 1000 : 1));
    let month: string | number = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    const day = date.getDate();
    return `${month}-${day}`;
  }
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: "250px",
        border: `1px solid ${MAIN_COLORS.activeTabColor}`,
      }}
    >
      <Table sx={{ backgroundColor: "black" }}>
        <TableHead>
          <TableRow>
            <TableCellShop>#</TableCellShop>
            <TableCellShop>Wind Speed</TableCellShop>
            <TableCellShop>Clicks Remain</TableCellShop>
            <TableCellShop>Bought Date</TableCellShop>
          </TableRow>
        </TableHead>
        <TableBody>
          {modifiers?.map((mod, index) => {
            return (
              <TableRow key={index}>
                <TableCell sx={{ color: MAIN_COLORS.textColor }}>
                  {mod.areaName}
                </TableCell>
                <TableCell sx={{ color: MAIN_COLORS.textColor }}>
                  {mod.boughtModifier?.find((modifier) => modifier.speed !== 0)
                    ? mod.boughtModifier?.map((modifier) => (
                        <div>
                          <span key={modifier.speed}>{modifier.speed}</span>
                          <br></br>
                        </div>
                      ))
                    : 0}
                </TableCell>
                <TableCell
                  sx={{
                    color: MAIN_COLORS.textColor,
                  }}
                >
                  {mod.boughtModifier?.find(
                    (modifier) => modifier.clicksRemaining !== 0,
                  )
                    ? mod.boughtModifier?.map((modifier) => (
                        <div>
                          <span key={modifier.speed}>
                            {formatDateToMonthDay(modifier.boughtDate)}
                          </span>
                          <br></br>
                        </div>
                      ))
                    : 0}
                </TableCell>
                <TableCell sx={{ color: MAIN_COLORS.textColor }}>
                  {mod.boughtModifier?.find(
                    (modifier) =>
                      modifier.boughtDate !== null &&
                      modifier.boughtDate !== undefined,
                  )
                    ? mod.boughtModifier?.map((modifier) => (
                        <div>
                          <span key={modifier.speed}>
                            {formatDateToMonthDay(modifier.boughtDate)}
                          </span>
                          <br></br>
                        </div>
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
