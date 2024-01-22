import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { FC, useState } from 'react';

import Layout from '../layout/layout';
import Search from '../components/Search/search';

const IndexPage: FC<PageProps> = () => {
  const [searchedItem, setSearchedItem] = useState('Cheddar');

  return (
    <Layout>
      <Search />
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Food</title>;
