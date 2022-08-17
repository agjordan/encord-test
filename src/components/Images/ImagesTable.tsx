import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as Colors from "@mui/material/colors";
import { Button, Paper } from "@mui/material";
import { Image } from "../TabBarAndPanels/TabBarAndPanels";

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

type ImagesTableProps = {
  rows: Image[];
  onPredictClick: (imageUrl: string) => void;
};

const ImagesTable: FC<ImagesTableProps> = ({ rows, onPredictClick }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Filename</StyledTableCell>
            <StyledTableCell align="right">Size</StyledTableCell>
            <StyledTableCell align="right">Uploaded at</StyledTableCell>
            <StyledTableCell align="right">PREDICT</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.filename + row.uploadedAt}>
              <StyledTableCell>{row.filename}</StyledTableCell>
              <StyledTableCell align="right">{row.size}</StyledTableCell>
              <StyledTableCell align="right">
                {row.uploadedAt.toLocaleString("en-GB")}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button onClick={(_event) => onPredictClick(row.image)}>Predict</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ImagesTable;
