import React, { FC, useRef, useContext } from 'react';
import { SearchProps } from './models';
import { Table } from '~/components/Table';
import { Loader } from '~/components/Loader';
import { FoodDataContext } from '~/context/foodDataCentral';
import translateText from '~/utils/translateText';

//materialUI
import { TextField, Button, Box, Grid, Alert } from '@mui/material';

export const Search: FC<SearchProps> = () => {
  const { getSearchedData, showAlert, showLoader, detailsData } =
    useContext(FoodDataContext);

  const textInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = async () => {
    const val = textInputRef.current?.value;

    if (val !== undefined) {
      const translatedVal = await translateText(val, 'en');
      getSearchedData(translatedVal);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleButtonClick();
  };

  return (
    <Box sx={{ width: 'auto' }} display="flex">
      <Grid
        item
        container
        xs={12}
        display="flex"
        direction="row"
        gap={4}
        justifyContent="center"
        alignItems="center"
      >
        {showAlert && <Alert severity="error">Nie znaleziono produktu.</Alert>}
        <Grid
          item
          container
          xs={12}
          display="flex"
          gap={1}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            type="text"
            id="searchedProduct"
            label="Nazwa produktu"
            variant="standard"
            inputRef={textInputRef}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <Button variant="outlined" size="small" onClick={handleButtonClick}>
            Szukaj
          </Button>
        </Grid>

        <Grid
          item
          container
          xs={12}
          md={8}
          lg={4}
          justifyContent="center"
          alignItems="center"
        >
          {showLoader && <Loader />}
          <Table />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Search;
