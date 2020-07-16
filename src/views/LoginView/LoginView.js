import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import { routes } from 'routes';
import AuthTemplate from 'templates/AuthTemplate/AuthTemplate';
import { authenticate as authenticateAction, clean as cleanAction } from 'actions';
import { LoginSchema } from 'validation';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
  root: {},
  signUpText: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  },
  contentHeader: {
    fontSize: '88px',
    paddingLeft: theme.spacing(4),
  },
  contentBody: {
    padding: theme.spacing(4),
  },
  recoverPasswordText: {
    paddingTop: theme.spacing(2),
  },
  error: {
    paddingTop: theme.spacing(2),
    textAlign: 'center',
  },
}));

const LoginView = ({ authenticate, cleanUp, userId, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const classes = useStyles();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <AuthTemplate>
      <div className={classes.signUpText}>
        <Typography variant="body2">
          You don&#39;t have an account? <Link to="/register">Sign up</Link>
        </Typography>
      </div>
      <CardHeader
        className={classes.contentHeader}
        title="Sign in to SmartCash"
        subheader="Sign in on the internal platform"
      />
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          authenticate(values);
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, isValid }) => {
          if (userId) {
            return <Redirect to={routes.home} />;
          }
          return (
            <CardContent className={classes.contentBody}>
              <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          type="email"
                          margin="none"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          variant="outlined"
                          error={errors.email && touched.email}
                          helperText={errors.email && touched.email ? errors.email : null}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Password"
                          type={showPassword ? 'text' : 'password'}
                          margin="none"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          variant="outlined"
                          error={errors.password && touched.password}
                          helperText={errors.password && touched.password ? errors.password : null}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Button
                          fullWidth
                          color="primary"
                          variant="contained"
                          type="submit"
                          disabled={!isValid}
                        >
                          Sign in
                        </Button>
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Typography className={classes.error} variant="body2" color="error">
                          {error || null}
                        </Typography>
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Typography
                          className={classes.recoverPasswordText}
                          variant="body2"
                          color="textSecondary"
                        >
                          You have problems with sign in?
                        </Typography>
                      </Grid>
                    </Grid>
                  </Form>
                </Grid>
              </Grid>
            </CardContent>
          );
        }}
      </Formik>
    </AuthTemplate>
  );
};

const mapDispatchToProps = (dispatch) => ({
  authenticate: (email, password) => dispatch(authenticateAction(email, password)),
  cleanUp: () => dispatch(cleanAction()),
});

const mapStateToProps = (state) => {
  const { userId, error } = state.auth;
  return { userId, error };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
