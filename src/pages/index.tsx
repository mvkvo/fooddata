import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { FC, useState } from 'react';

import Search from '../components/Search/search';

const pageStyles = {
  color: '#ffffff',
  padding: 96,
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
  backgroundColor: '#3e3e42',
  minHeight: '100vh',
};

const IndexPage: FC<PageProps> = () => {
  const [searchedItem, setSearchedItem] = useState('Cheddar');

  return (
    <main style={pageStyles}>
      <Search />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Food</title>;
