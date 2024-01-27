import React, { FC, useContext, useEffect, useState } from 'react';
import translateText from '~/utils/translateText';
import { FoodNutrient, TranslatedFoodData } from '~/types/food-data';
import { FoodDataContext } from '~/context/foodDataCentral';
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
  TableRow as MUITableRow,
  Paper,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  accordionSummaryClasses,
} from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey,
    color: theme.palette.common.white,
    fontWeight: 700,
    textTransform: 'uppercase',
    border: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '12px 16px',
  },
  '&:nth-of-type(2)': {
    textAlign: 'right',
    textTransform: 'uppercase',
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

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  [`&.${accordionSummaryClasses}`]: {
    margin: 0,
  },
}));

export const ProductsList: FC<TableProps> = () => {
  const { productsArray } = useContext(FoodDataContext);

  return (
    <>
      {/*   <Accordion
        sx={{
          background: 'transparent',
          marginBottom: '12px',
        }}
      >
        <AccordionSummary
          component={Paper}
          sx={{
            border: 1,
            borderRadius: '8px',
            borderColor: 'grey.800',
            height: '50px',
          }}
        >
          <MUITable>
            <TableHead>
              <MUITableRow>
                <StyledTableCell component="th" scope="row">
                  SUMA
                </StyledTableCell>
              </MUITableRow>
            </TableHead>
          </MUITable>
        </AccordionSummary>
        <AccordionDetails>
          <MUITable>
            <TableBody>
              {item.nutrients.map(
                (item, index) =>
                  (item.amount && (
                    <StyledTableRow
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {item.nutrient.name}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {`${item.amount} ${item.nutrient.unitName}`}
                      </StyledTableCell>
                    </StyledTableRow>
                  )) ||
                  null
              )}
            </TableBody>
          </MUITable>
        </AccordionDetails>
      </Accordion> */}
      {productsArray.map((item) => (
        <Accordion
          sx={{
            background: 'transparent',
            marginBottom: '12px',
          }}
        >
          <AccordionSummary
            component={Paper}
            sx={{
              border: 1,
              borderRadius: '8px',
              borderColor: 'grey.800',
              height: '50px',
            }}
          >
            <MUITable>
              <TableHead>
                <MUITableRow>
                  <StyledTableCell component="th" scope="row">
                    {item.desc}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {'100 g'}
                  </StyledTableCell>
                </MUITableRow>
              </TableHead>
            </MUITable>
          </AccordionSummary>
          <AccordionDetails>
            <MUITable>
              <TableBody>
                {item.nutrients.map(
                  (item, index) =>
                    (item.amount && (
                      <StyledTableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <StyledTableCell component="th" scope="row">
                          {item.nutrient.name}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {`${item.amount} ${item.nutrient.unitName}`}
                        </StyledTableCell>
                      </StyledTableRow>
                    )) ||
                    null
                )}
              </TableBody>
            </MUITable>
          </AccordionDetails>
        </Accordion>
      )) || null}
    </>
  );
};

export default ProductsList;
