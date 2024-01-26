import React, { FC, useContext, useEffect, useState } from 'react';
import translateText from '~/utils/translateText';
import { FoodNutrient } from '~/types/food-data';
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
} from '@mui/material';

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

export const Table: FC<TableProps> = () => {
  const { detailsData, showLoader } = useContext(FoodDataContext);
  const [translatedDesc, setTranslatedDesc] = useState<string>();
  const [translatedNutrientsData, setTranslatedNutrientsData] = useState<
    FoodNutrient[]
  >([]);

  useEffect(() => {
    const translateDesc = async () =>
      setTranslatedDesc(await translateText(detailsData.description, 'pl'));

    const translateNutrientsData = () => {
      detailsData.foodNutrients.map(async (item) => {
        const translatedNutrientName = await translateText(
          item.nutrient.name,
          'pl'
        );

        setTranslatedNutrientsData((curr) => [
          ...curr,
          {
            ...item,
            nutrient: { ...item.nutrient, name: translatedNutrientName },
          },
        ]);
      });
    };

    translateDesc();
    translateNutrientsData();
  }, [detailsData]);

  useEffect(() => {
    if (showLoader) setTranslatedNutrientsData([]);
  }, [showLoader]);

  return (
    <>
      {(translatedNutrientsData.length && (
        <TableContainer
          component={Paper}
          sx={{
            border: 1,
            borderRadius: '8px',
            borderColor: 'grey.800',
          }}
        >
          <MUITable>
            <TableHead>
              <MUITableRow>
                <StyledTableCell component="th" scope="row">
                  {translatedDesc}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {'100 g'}
                </StyledTableCell>
              </MUITableRow>
            </TableHead>
            <TableBody>
              {translatedNutrientsData &&
                translatedNutrientsData.map(
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
        </TableContainer>
      )) ||
        null}
    </>
  );
};

export default Table;
