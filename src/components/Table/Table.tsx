import React, { FC, useContext, useEffect, useState } from 'react';
import translateText from '~/utils/translateText';
import { TranslatedFoodData } from '~/types/food-data';
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
  Button,
  Grid,
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

export const Table: FC<TableProps> = () => {
  const {
    detailsData,
    showLoader,
    productsArray,
    setProductsArray,
    totalNutrients,
    setTotalNutrients,
  } = useContext(FoodDataContext);

  const [translatedNutrients, setTranslatedNutrients] =
    useState<TranslatedFoodData>();

  useEffect(() => {
    if (!detailsData.foodNutrients.length) return;
    const translateData = async () => {
      const translate = async (text) => translateText(text, 'pl');

      const translateFoodData = () => {
        return Promise.all(
          detailsData.foodNutrients.map(async (item) => ({
            ...item,
            nutrient: {
              ...item.nutrient,
              name: await translate(item.nutrient.name),
            },
          }))
        );
      };

      setTranslatedNutrients({
        desc: await translate(detailsData.description),
        nutrients: await translateFoodData(),
      });
    };

    translateData();
  }, [detailsData]);

  useEffect(() => {
    if (showLoader) setTranslatedNutrients(undefined);
  }, [showLoader]);

  useEffect(() => {
    console.log(productsArray);
  }, [productsArray]);

  const handleAddToListButtonClick = () => {
    if (translatedNutrients) {
      setProductsArray((curr) => [...curr, translatedNutrients]);
      /* setTotalNutrients((curr) => curr.map((currNutr) => {
        const test = translatedNutrients.nutrients.find(x => x.id === currNutr.id)
      })) */
      /*    const sumNutr = translatedNutrients.nutrients.map((x) =>
        totalNutrients.find((y) => y.nutrient.id === x.nutrient.id)
      );
      setTotalNutrients(); */
    }
  };

  return (
    <>
      {(translatedNutrients?.nutrients.length && (
        <Grid container justifyContent="right" gap={1}>
          <Button
            size="small"
            variant="contained"
            onClick={handleAddToListButtonClick}
          >
            Dodaj do listy +
          </Button>
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
                    {translatedNutrients.desc}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {'100 g'}
                  </StyledTableCell>
                </MUITableRow>
              </TableHead>
              <TableBody>
                {translatedNutrients.nutrients.map(
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
        </Grid>
      )) ||
        null}
    </>
  );
};

export default Table;
