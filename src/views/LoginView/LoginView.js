import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Button,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import { routes } from 'routes';
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

const LoginView = ({ authenticate, cleanUp, userId, error, isLoading }) => {
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
    <>
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
                        <FormControl variant="outlined" fullWidth margin="dense">
                          <TextField
                            fullWidth
                            label="Email Address"
                            variant="outlined"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            error={errors.email && touched.email}
                          />
                          <FormHelperText error>
                            {errors.email && touched.email ? errors.email : null}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <FormControl variant="outlined" fullWidth margin="dense">
                          <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            variant="outlined"
                            error={errors.password && touched.password}
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
                          <FormHelperText error>
                            {errors.password && touched.password ? errors.password : null}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Button
                          fullWidth
                          color="primary"
                          variant="contained"
                          type="submit"
                          disabled={!isValid}
                        >
                          {isLoading ? 'Signing in...' : 'Sign in'}
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
                          <Link to="/send-reset-mail">You have problems with sign in?</Link>
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
    </>
  );
};
LoginView.propTypes = {
  authenticate: PropTypes.func.isRequired,
  cleanUp: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

LoginView.defaultProps = {
  error: null,
};

const mapDispatchToProps = (dispatch) => ({
  authenticate: (email, password) => dispatch(authenticateAction(email, password)),
  cleanUp: () => dispatch(cleanAction()),
});

const mapStateToProps = (state) => {
  const { userId, error, isLoading } = state.auth;
  return { userId, error, isLoading };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
