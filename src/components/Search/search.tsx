import React, { FC, useState, useEffect, useRef } from 'react';
import { Alert, Button, TextInput, Table } from 'flowbite-react';
import { SearchProps } from './models';
import { DetailsResults, SearchResults } from '../../types/food-data';
import {
  FOODDATA_CENTRAL_API_KEY,
  FOODDATA_CENTRAL_BASE_URL,
} from '../../utils/constans';

const Search: FC<SearchProps> = () => {
  const [searchedData, setSearchedData] = useState<SearchResults>();
  const [detailsData, setDetailsData] = useState<DetailsResults>();
  const [showAlert, setShowAlert] = useState(false);
  const textInputRef = useRef<HTMLInputElement>(null);

  const base_url = FOODDATA_CENTRAL_BASE_URL;
  const api_key = FOODDATA_CENTRAL_API_KEY;
  const search_path = '/foods/search';
  const details_path = '/food/';

  const getSearchedData = async (searchedItem: string) => {
    try {
      const fdc_search_url = `${base_url}${search_path}?api_key=${api_key}&query=${searchedItem}&pageSize=1`;
      const response = await fetch(fdc_search_url);
      const dataGrabbed = await response.json();
      setSearchedData(dataGrabbed);
    } catch (e) {
      setShowAlert(true);
    }
  };

  const getDetailsData = async (fdcId: number) => {
    const fdc_details_url = `${base_url}${details_path}${fdcId}?api_key=${api_key}`;
    const response = await fetch(fdc_details_url);
    const dataGrabbed = await response.json();
    setDetailsData(dataGrabbed);
  };

  useEffect(() => {
    const fdcId = searchedData?.foods[0].fdcId;

    if (fdcId !== undefined) {
      getDetailsData(fdcId);
    }
  }, [searchedData]);

  const handleButtonClick = () => {
    const val = textInputRef.current?.value;

    if (val !== undefined) {
      getSearchedData(val);
    }
  };

  console.log(searchedData);
  console.log(detailsData);

  return (
    <div>
      {showAlert && (
        <Alert color='failure'>
          <span className='font-medium'>Error!</span>Nie znaleziono produktu.
        </Alert>
      )}
      <div className='max-w-md flex gap-2'>
        <TextInput
          className='flex-1'
          ref={textInputRef}
          id='searchedProduct'
          type='text'
          placeholder='Nazwa produktu...'
          required
        />
        <Button
          className='flex-1/2'
          onClick={handleButtonClick}>
          Szukaj
        </Button>
      </div>
      <h2 className='my-2'>{detailsData?.description} (100g)</h2>
      {detailsData?.foodNutrients && (
        <Table>
          <Table.Body className='divide-y'>
            {detailsData?.foodNutrients.map((item) => (
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {item.nutrient.name}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {item.amount} {item.nutrient.unitName}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export default Search;
