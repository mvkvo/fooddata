import React, { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { LoaderProps } from './models';

const Loader: FC<LoaderProps> = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
