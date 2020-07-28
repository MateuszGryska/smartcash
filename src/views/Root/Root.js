import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Chart } from 'react-chartjs-2';
import LinearProgress from '@material-ui/core/LinearProgress';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useAuth } from 'hooks/auth-hook';
import 'theme/global.scss';
import MainTemplate from 'templates/MainTemplate/MainTemplate';
import theme from 'theme/mainTheme';
import { routes } from 'routes';
import LoginView from 'views/LoginView/';
import RegisterView from 'views/RegisterView/';
import SendResetMailView from 'views/SendResetMailView';
import ResetPasswordView from 'views/ResetPasswordView';
import UserTemplate from 'templates/UserTemplate';
import AuthTemplate from 'templates/AuthTemplate';
import { setUserId as setUserIdAction, logout as logoutAction } from 'actions';

// add corner radius to chart
import { chartjs } from 'helpers';

const BudgetCategoriesView = React.lazy(() => import('views/BudgetCategoriesView'));
const DashboardView = React.lazy(() => import('views/DashboardView/'));
const BudgetListView = React.lazy(() => import('views/BudgetListView/'));
const SettingsView = React.lazy(() => import('views/SettingsView/'));
const WalletsView = React.lazy(() => import('views/WalletsView/'));

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw,
});

function Root({ token, setUser, expiration, logout }) {
  const { tokenId } = useAuth(setUser, expiration, token, logout);

  let routesWhenLoggedIn;
  if (tokenId || token) {
    routesWhenLoggedIn = (
      <Switch>
        <>
          <UserTemplate>
            <Suspense fallback={<LinearProgress />}>
              <Route exact path={routes.home} render={() => <Redirect to="/dashboard" />} />
              <Route exact path={routes.dashboard} component={DashboardView} />
              <Route exact path={routes.budgetlist} component={BudgetListView} />
              <Route exact path={routes.budgetcategories} component={BudgetCategoriesView} />
              <Route exact path={routes.wallets} component={WalletsView} />
              <Route exact path={routes.settings} component={SettingsView} />
              <Redirect to={routes.home} />
            </Suspense>
          </UserTemplate>
        </>
      </Switch>
    );
  } else {
    routesWhenLoggedIn = (
      <>
        <AuthTemplate>
          <Switch>
            <Route exact path={routes.home} render={() => <Redirect to="/login" />} />
            <Route path={routes.login} component={LoginView} />
            <Route path={routes.register} component={RegisterView} />
            <Route path={routes.sendResetMail} component={SendResetMailView} />
            <Route path={routes.resetPassword} component={ResetPasswordView} />
            <Redirect to={routes.login} />
          </Switch>
        </AuthTemplate>
      </>
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
