import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import MainTemplate from '../layouts/MainTemplate/MainTemplate';
import theme from '../theme/mainTheme';

function Root() {
  return (
    <MuiThemeProvider theme={theme}>
      <MainTemplate>test</MainTemplate>
    </MuiThemeProvider>
  );
}

export default Root;
