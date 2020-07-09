import React from 'react';
import { connect } from 'react-redux';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useAuth } from 'hooks/auth-hook';
import 'theme/global.scss';
import MainTemplate from 'templates/MainTemplate/MainTemplate';
import theme from 'theme/mainTheme';
import { routes } from 'routes';

import BudgetCategoriesView from 'views/BudgetCategoriesView';
import DashboardView from 'views/DashboardView/';
import BudgetListView from 'views/BudgetListView/';
import SettingsView from 'views/SettingsView/';
import WalletsView from 'views/WalletsView/';
import LoginView from 'views/LoginView/';
import RegisterView from 'views/RegisterView/';

import { setUserId as setUserIdAction, logout as logoutAction } from 'actions';

// add corner radius to chart
import { chartjs } from 'helpers';

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw,
});

// let expirationTimer;

function Root({ token, setUser, expiration, logout }) {
  const { tokenId } = useAuth(setUser, expiration, token, logout);

  let routesWhenLoggedIn;
  if (tokenId || token) {
    routesWhenLoggedIn = (
      <Switch>
        <Route exact path={routes.home} render={() => <Redirect to="/dashboard" />} />
        <Route exact path={routes.dashboard} component={DashboardView} />
        <Route exact path={routes.budgetlist} component={BudgetListView} />
        <Route exact path={routes.budgetcategories} component={BudgetCategoriesView} />
        <Route exact path={routes.wallets} component={WalletsView} />
        <Route exact path={routes.settings} component={SettingsView} />
        <Redirect to={routes.home} />
      </Switch>
    );
  } else {
    routesWhenLoggedIn = (
      <Switch>
        <Route exact path={routes.login} component={LoginView} />
        <Route exact path={routes.register} component={RegisterView} />
        <Redirect to={routes.login} />
      </Switch>
    );
  }

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <MainTemplate>{routesWhenLoggedIn}</MainTemplate>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

const mapStateToProps = (state) => {
  const { token, expiration } = state.auth;
  return { token, expiration };
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (userId, token, expiration) => dispatch(setUserIdAction(userId, token, expiration)),
  logout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
