import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../theme/GlobalStyle';
import { theme } from '../theme/mainTheme';
import Topbar from './components/Topbar';

const MainLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Topbar />
    </ThemeProvider>
  );
};

export default MainLayout;
