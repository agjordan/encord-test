import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as Colors from "@mui/material/colors";
import { Button, Paper } from "@mui/material";
import { FC } from "react";
import { Prediction } from "../TabBarAndPanels/TabBarAndPanels";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: Colors.blue[500],
    color: Colors.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: Colors.blue[100],
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

type PredictionsTableProps = {
  rows: Prediction[];
  onViewClick: (prediction: Prediction) => void;
};

const PredictionsTable: FC<PredictionsTableProps> = ({ rows, onViewClick }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Submitted at</StyledTableCell>
            <StyledTableCell align="right">VIEW</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.title + row.submittedAt}>
              <StyledTableCell>{row.title}</StyledTableCell>
              <StyledTableCell align="right">{row.description}</StyledTableCell>
              <StyledTableCell align="right">
                {row.submittedAt.toLocaleString("en-GB")}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button onClick={(_event) => onViewClick(row)}>View</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PredictionsTable;
