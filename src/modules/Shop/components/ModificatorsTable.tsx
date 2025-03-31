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
type Modificator = {
  windSpeed: number;
  clicksRemain: number;
  boughtDate: string;
};

type ModificatorsTableProps = {
  modificators: Modificator[];
};

const ModificatorsTable: React.FC<ModificatorsTableProps> = ({
  modificators,
}) => {
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
          {modificators.map((mod, index) => (
            <TableRow key={index}>
              <TableCell sx={{ color: MAIN_COLORS.textColor }}>
                {index + 1}
              </TableCell>
              <TableCell sx={{ color: MAIN_COLORS.textColor }}>
                {mod.windSpeed}
              </TableCell>
              <TableCell sx={{ color: MAIN_COLORS.textColor }}>
                {mod.clicksRemain}
              </TableCell>
              <TableCell sx={{ color: MAIN_COLORS.textColor }}>
                {mod.boughtDate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ModificatorsTable;
