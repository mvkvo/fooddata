import React, { FC } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Layout } from '~/layout';
import { Search } from '~/components/Search';
import { FoodDataProvider } from '~/context/foodDataCentral';

//materialUI
import { Typography, Box } from '@mui/material';

const IndexPage: FC<PageProps> = () => {
  return (
    <Layout>
      <FoodDataProvider>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h3" gutterBottom textAlign="center">
            Food Data
          </Typography>
          <Search />
        </Box>
      </FoodDataProvider>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Food</title>;
