import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import MainTemplate from '../../layouts/MainTemplate/MainTemplate';
import theme from '../../theme/mainTheme';
import { routes } from '../../routes';

import BudgetView from '../BudgetView/BudgetView';
import DashboardView from '../DashboardView/DashboardView';
import ExpensesView from '../ExpensesView/ExpensesView';
import SettingsView from '../SettingsView/SettingsView';
import WalletsView from '../WalletsView/WalletsView';

function Root() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <MainTemplate>
          <Switch>
            <Route exact path={routes.home} render={() => <Redirect to="/dashboard" />} />
            <Route exact path={routes.dashboard} component={DashboardView} />
            <Route exact path={routes.expenses} component={ExpensesView} />
            <Route exact path={routes.budget} component={BudgetView} />
            <Route exact path={routes.wallets} component={WalletsView} />
            <Route exact path={routes.settings} component={SettingsView} />
            <Redirect to={routes.home} />
          </Switch>
        </MainTemplate>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default Root;
