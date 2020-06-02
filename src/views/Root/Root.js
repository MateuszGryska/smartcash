import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Chart } from 'react-chartjs-2';
import { Provider } from 'react-redux';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import theme from '../../theme/mainTheme';
import { routes } from '../../routes';
import store from '../../store';

import BudgetView from '../BudgetView/BudgetView';
import DashboardView from '../DashboardView/DashboardView';
import ExpensesView from '../ExpensesView/ExpensesView';
import SettingsView from '../SettingsView/SettingsView';
import WalletsView from '../WalletsView/WalletsView';
import LoginView from '../LoginView/LoginView';
import RegisterView from '../RegisterView/RegisterView';

// add corner radius to chart
import { chartjs } from '../../helpers';

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw,
});

function Root() {
  return (
    <Provider store={store}>
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
              <Route exact path={routes.login} component={LoginView} />
              <Route exact path={routes.register} component={RegisterView} />
              <Redirect to={routes.home} />
            </Switch>
          </MainTemplate>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}

export default Root;
