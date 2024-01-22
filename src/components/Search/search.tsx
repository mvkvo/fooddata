import React, { FC, useState, useEffect, useRef, useCallback } from 'react';

import { Table } from '../Table';
import Loader from '../Loader/loader';

import { DetailsResults, SearchResults } from '../../types/food-data';
import { SearchProps } from './models';

//materialUI
import { TextField, Button, Box, Grid, Alert } from '@mui/material';

const Search: FC<SearchProps> = () => {
  const [searchedData, setSearchedData] = useState<SearchResults>();
  const [detailsData, setDetailsData] = useState<DetailsResults | null>();

  const [showAlert, setShowAlert] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const textInputRef = useRef<HTMLInputElement>(null);

  const base_url = process.env.GATSBY_FOODDATA_CENTRAL_BASE_URL;
  const api_key = process.env.GATSBY_FOODDATA_CENTRAL_API_KEY;
  const search_path = '/foods/search';
  const details_path = '/food/';

  const getSearchedData = useCallback((searchedItem: string) => {
    setShowAlert(false);
    setShowLoader(true);
    const fdc_search_url = `${base_url}${search_path}?api_key=${api_key}&query=${searchedItem}&pageSize=1`;

    return fetch(fdc_search_url)
      .then(async (res) => {
        const data = await res.json();
        if (!data.foods.length) {
          setShowAlert(true);
          setShowLoader(false);
          return;
        }
        setSearchedData(data);
      })
      .catch((error) => {
        setShowAlert(true);
        console.error(`Cannot find "${searchedItem}" product - ${error}`);
      });
  }, []);

  const getDetailsData = async (fdcId: number) => {
    const fdc_details_url = `${base_url}${details_path}${fdcId}?api_key=${api_key}`;

    return fetch(fdc_details_url)
      .then(async (res) => {
        const data = await res.json();
        console.log('data', data);
        setDetailsData(data);
      })
      .catch((error) => {
        setShowAlert(true);
        console.error(`Cannot find "${fdcId}" product - ${error}`);
      })
      .finally(() => setShowLoader(false));
  };

  useEffect(() => {
    if (!searchedData?.foods) return;
    const fdcId = searchedData?.foods[0].fdcId;
    if (fdcId) getDetailsData(fdcId);
  }, [searchedData]);

  useEffect(() => {
    if (!detailsData) return;
    console.log(detailsData);
  }, [detailsData]);

  const handleButtonClick = () => {
    const val = textInputRef.current?.value;

    if (val !== undefined) {
      setDetailsData(null);
      getSearchedData(val);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleButtonClick();
  };

  /*   const tableMapper = {
    head: {
      row: [{ cells: [detailsData?.description as string, '100 g'] }],
    },
    body: {
      ...detailsData?.foodNutrients.map((item) => ({
        row: [
          {
            cells: [
              item.nutrient.name,
              `${item.amount} ${item.nutrient.unitName}`,
        ],
        ],
      },
      tableBody: {
        content: [
          {
            row: [{ cell: 'test 1' }, { cell: '0.6g' }],
          },
          {
            row: [{ cell: 'test 1' }, { cell: '0.6g' }],
            ],
      },
      tableBody: {
        content: [
          {
            row: [{ cell: 'test 1' }, { cell: '0.6g' }],
          },
          {
            row: [{ cell: 'test 1' }, { cell: '0.6g' }],
          },
        ],
      })),
    },
  }; */

  return (
    <Box
      sx={{ width: 'auto' }}
      display='flex'>
      <Grid
        item
        container
        xs={12}
        display='flex'
        direction='row'
        gap={4}
        justifyContent='center'
        alignItems='center'>
        {showAlert && <Alert severity='error'>Nie znaleziono produktu.</Alert>}
        <Grid
          item
          container
          xs={12}
          display='flex'
          gap={1}
          direction='column'
          justifyContent='center'
          alignItems='center'>
          <TextField
            type='text'
            id='searchedProduct'
            label='Nazwa produktu'
            variant='standard'
            inputRef={textInputRef}
            onKeyDown={handleKeyDown}
          />
          <Button
            variant='text'
            onClick={handleButtonClick}>
            Szukaj
          </Button>
        </Grid>

        <Grid
          item
          container
          xs={12}
          md={8}
          lg={4}
          justifyContent='center'
          alignItems='center'>
          {showLoader && <Loader />}
          {detailsData && <Table data={detailsData} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Search;
