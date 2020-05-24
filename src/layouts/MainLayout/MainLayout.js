import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../../theme/GlobalStyle';
import theme from '../../theme/mainTheme';
import Topbar from './Topbar';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Topbar />
        <Sidebar />
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default MainLayout;
