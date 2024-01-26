import React, { FC } from 'react';
import { LoaderProps } from './models';

//materialUI
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Loader: FC<LoaderProps> = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
