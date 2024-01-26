import React, { FC } from 'react';
import { LayoutProps } from './model';
import '~/styles/global.css';

//materialUI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const Layout: FC<LayoutProps> = ({ children, className }) => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <main>{children}</main>
  </ThemeProvider>
);

export default Layout;
