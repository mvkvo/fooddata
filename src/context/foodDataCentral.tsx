import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

import {
  DetailsResults,
  SearchResults,
  TranslatedFoodData,
  FoodNutrient,
} from '~/types/food-data';

const defaultValues = {
  detailsData: {
    fdcId: 0,
    foodClass: '',
    dataType: '',
    description: '',
    publicationDate: '',
    foodNutrients: [],
    foodComponents: [],
    foodAttributes: [],
    foodPortions: [],
    inputFoods: [],
    tableAliasName: '',
    foodCode: '',
    startDate: '',
    endDate: '',
    wweiaFoodCategory: {
      wweiaFoodCategoryCode: 0,
      wweiaFoodCategoryDescription: '',
    },
    changes: '',
  } as DetailsResults,
  getSearchedData: (searchedItem) => {},
  showAlert: false,
  showLoader: false,
  productsArray: [] as TranslatedFoodData[],
  setProductsArray: (product) => {},
  totalNutrients: [] as FoodNutrient[],
  setTotalNutrients: (nutrients) => {},
};

export const FoodDataContext = createContext(defaultValues);

const API_URL = process.env.GATSBY_FOODDATA_CENTRAL_API_URL;
const API_KEY = process.env.GATSBY_FOODDATA_CENTRAL_API_KEY;

const fdc_search_path = '/foods/search';
const fdc_details_path = '/food/';

export const FoodDataProvider = ({ children }) => {
  const [searchedData, setSearchedData] = useState<SearchResults>();
  const [detailsData, setDetailsData] = useState<DetailsResults>(
    defaultValues.detailsData
  );

  const [showAlert, setShowAlert] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const [productsArray, setProductsArray] = useState([]);
  const [totalNutrients, setTotalNutrients] = useState([]);

  useEffect(() => {
    if (!searchedData?.foods) return;
    const fdcId = searchedData?.foods[0].fdcId;
    if (fdcId) getDetailsData(fdcId);
  }, [searchedData]);

  const getSearchedData = async (searchedItem) => {
    setShowAlert(false);
    setShowLoader(true);

    await axios
      .post(`${API_URL}${fdc_search_path}?api_key=${API_KEY}`, {
        query: searchedItem,
        pageSize: 1,
      })
      .then(async (res) => {
        const data = await res.data;
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
  };

  const getDetailsData = async (fdcId) => {
    await axios
      .get(`${API_URL}${fdc_details_path}${fdcId}?api_key=${API_KEY}`)
      .then(async (res) => {
        const data = await res.data;
        setDetailsData(data);
      })
      .catch((error) => {
        setShowAlert(true);
        console.error(`Cannot find "${fdcId}" product - ${error}`);
      })
      .finally(() => setShowLoader(false));
  };

  const providerValue = {
    ...defaultValues,
    setDetailsData,
    getSearchedData,
    detailsData,
    productsArray,
    setProductsArray,
    totalNutrients,
    setTotalNutrients,
    showAlert,
    showLoader,
  };

  return (
    <FoodDataContext.Provider value={providerValue}>
      {children}
    </FoodDataContext.Provider>
  );
};
