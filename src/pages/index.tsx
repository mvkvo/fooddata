import React, { FC } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Layout } from '~/layout';
import { Search } from '~/components/Search';
import { ProductsList } from '~/components/ProductsList';
import { FoodDataProvider } from '~/context/foodDataCentral';

//materialUI
import { Typography, Box, Grid } from '@mui/material';

const IndexPage: FC<PageProps> = () => {
  return (
    <Layout>
      <FoodDataProvider>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h3" gutterBottom textAlign="center">
            Food Data
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Search />
          </Grid>
          <Grid item xs={4}>
            <ProductsList />
          </Grid>
        </Grid>
        <Box sx={{ width: '40%' }}></Box>
      </FoodDataProvider>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Food</title>;
