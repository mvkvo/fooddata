import React, { FC } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { LayoutProps } from './model';

import '../styles/global.css';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Layout: FC<LayoutProps> = ({ children, className }) => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <main>{children}</main>
  </ThemeProvider>
);

export default Layout;
