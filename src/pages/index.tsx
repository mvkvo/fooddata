import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { FC, useState } from 'react';
import { Typography, Box } from '@mui/material';

import Layout from '../layout/layout';
import Search from '../components/Search/search';

const IndexPage: FC<PageProps> = () => {
  const [searchedItem, setSearchedItem] = useState('Cheddar');

  return (
    <Layout>
      <Box sx={{ width: '100%' }}>
        <Typography
          variant='h3'
          gutterBottom
          textAlign='center'>
          Food Data
        </Typography>
        <Search />
      </Box>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Food</title>;
