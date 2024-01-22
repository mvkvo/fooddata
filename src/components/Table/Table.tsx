import React, { FC } from 'react';
import { TableProps } from './models';

//materialUI
import {
  styled,
  Table as MUITable,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const Table: FC<TableProps> = ({ content }) => {
  return (
    <TableContainer component={Paper}>
      <MUITable>
        <TableHead>
          {content.tableHead?.content.map((tableHeadItem, index) => (
            <TableRow key={index}>
              {tableHeadItem.row.map((tableHeadRowItem) => (
                <StyledTableCell
                  component='th'
                  scope='row'>
                  {tableHeadRowItem.cell}
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {content.tableBody?.content.map((tableBodyItem, index) => (
            <StyledTableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {tableBodyItem.row.map((tableBodyRowItem) => (
                <StyledTableCell
                  component='th'
                  scope='row'>
                  {tableBodyRowItem.cell}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
};

export default Table;
