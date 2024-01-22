import React, { FC } from 'react';

//materialUI
import {
  styled,
  Table as MUITable,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow as MUITableRow,
  Paper,
} from '@mui/material';
import { TableProps } from './models';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey,
    color: theme.palette.common.white,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  '&:nth-of-type(2)': {
    textAlign: 'right',
  },
}));

const StyledTableRow = styled(MUITableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },

  '&:th': {
    textAlign: 'right',
  },
}));

export const Table: FC<TableProps> = ({ data }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        border: 1,
        borderRadius: '8px',
        borderColor: 'grey.800',
      }}>
      <MUITable>
        <TableHead>
          <MUITableRow>
            <StyledTableCell
              component='th'
              scope='row'>
              {data.description}
            </StyledTableCell>
            <StyledTableCell
              component='th'
              scope='row'>
              {'100 g'}
            </StyledTableCell>
          </MUITableRow>
          {/*           {head?.row.map((headRow, index) => (
            <MUITableRow key={index}>
              {headRow.cells.map((headRowCell) => (
                <StyledTableCell
                  component='th'
                  scope='row'>
                  {headRowCell}
                </StyledTableCell>
              ))}
            </MUITableRow>
          ))} */}
        </TableHead>
        <TableBody>
          {data.foodNutrients.map(
            (item, index) =>
              item.nutrient && (
                <StyledTableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell
                    component='th'
                    scope='row'>
                    {item.nutrient.name}
                  </StyledTableCell>
                  <StyledTableCell
                    component='th'
                    scope='row'>
                    {`${item.amount} ${item.nutrient.unitName}`}
                  </StyledTableCell>
                </StyledTableRow>
              )
          )}

          {/* {body?.row.map((bodyRow, index) => (
            <StyledTableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {bodyRow.cells.map((bodyRowCell) => (
                <StyledTableCell
                  component='th'
                  scope='row'>
                  {bodyRowCell}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))} */}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
};

export default Table;
