import React, { FC, useState, useEffect, useRef, useCallback } from 'react';
import { SearchProps } from './models';
import { DetailsResults, SearchResults } from '../../types/food-data';
import { Table } from '../Table';
import Loader from '../Loader/loader';

import Button from '@mui/material/Button';

//materialUI
import { styled } from '@mui/material/styles';
import { TextField, Box, Paper, Grid, Alert } from '@mui/material';

const Search: FC<SearchProps> = () => {
  const [searchedData, setSearchedData] = useState<SearchResults>();
  const [detailsData, setDetailsData] = useState<DetailsResults>();
  const [showAlert, setShowAlert] = useState(false);
  const [showLoader, setShowLeader] = useState(false);

  const textInputRef = useRef<HTMLInputElement>(null);

  const base_url = process.env.FOODDATA_CENTRAL_BASE_URL;
  const api_key = process.env.FOODDATA_CENTRAL_API_KEY;
  const search_path = '/foods/search';
  const details_path = '/food/';

  const getSearchedData = useCallback((searchedItem: string) => {
    setShowAlert(false);
    setShowLeader(true);
    const fdc_search_url = `${base_url}${search_path}?api_key=${api_key}&query=${searchedItem}&pageSize=1`;

    return fetch(fdc_search_url)
      .then(async (res) => setSearchedData(await res.json()))
      .catch((error) => {
        setShowAlert(true);
        console.error(`Cannot find "${searchedItem}" product - ${error}`);
      });
  }, []);

  const getDetailsData = async (fdcId: number) => {
    const fdc_details_url = `${base_url}${details_path}${fdcId}?api_key=${api_key}`;

    return fetch(fdc_details_url)
      .then(async (res) => {
        setDetailsData(await res.json());
      })
      .catch((error) => {
        setShowAlert(true);
        console.error(`Cannot find "${fdcId}" product - ${error}`);
      })
      .finally(() => setShowLeader(false));
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
      getSearchedData(val);
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const FDCdata = {
    content: {
      tableHead: {
        content: [
          {
            row: [{ cell: 'produkt' }, { cell: '100g' }],
          },
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
      },
    },
  };

  /*  
         ['test 2', '6.4g'],
  {
      detailsData?.foodNutrients.map((item) => 
          [item.nutrient.name, `${item.amount} ${item.nutrient.unitName}`]
        )
    }, */

  return (
    <Box
      sx={{ width: 'auto' }}
      display='flex'>
      <Grid
        container
        columns={1}
        direction='row'
        justifyContent='center'
        alignItems='center'>
        {showAlert && <Alert severity='error'>Nie znaleziono produktu.</Alert>}
        <Grid
          xs={12}
          item>
          <TextField
            type='text'
            id='searchedProduct'
            label='Nazwa produktu'
            variant='standard'
            ref={textInputRef}
          />
        </Grid>
        <Grid
          xs={12}
          item>
          <Button
            variant='text'
            onClick={handleButtonClick}>
            Szukaj
          </Button>
        </Grid>
        <Grid
          item
          flexGrow={1}>
          {/*           {showLoader && <Loader />} */}
          <Table {...FDCdata} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Search;
