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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { routes } from 'routes';
import AuthTemplate from 'templates/AuthTemplate/AuthTemplate';
import { signUp as signUpAction, clean as cleanAction } from 'actions';
import { RegisterSchema } from 'validation';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
  root: {},
  headerText: {
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentHeader: {
    fontSize: '88px',
    paddingLeft: theme.spacing(4),
  },
  contentBody: {
    paddingTop: theme.spacing(2),
    padding: theme.spacing(4),
  },
  error: {
    paddingTop: theme.spacing(2),
    textAlign: 'center',
  },
}));

const RegisterView = ({ signUp, cleanUp, userId, error, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const classes = useStyles();
  return (
    <AuthTemplate>
      <div className={classes.headerText}>
        <Button component={Link} to="/login">
          <ArrowBackIcon /> <Typography variant="body2">Go back</Typography>
        </Button>
        <Typography variant="body2">
          Have an account? <Link to="/login">Sign in</Link>
        </Typography>
      </div>
      <CardHeader
        className={classes.contentHeader}
        title="Sign up to SmartCash"
        subheader="Sign up on the internal platform"
      />
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          signUp(values);
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, isValid }) => {
          if (userId) {
            return <Redirect to={routes.home} />;
          }
          return (
            <>
              <CardContent className={classes.contentBody}>
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12}>
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            label="First name"
                            type="text"
                            margin="none"
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            variant="outlined"
                            error={errors.firstName && touched.firstName}
                            helperText={
                              errors.firstName && touched.firstName ? errors.firstName : null
                            }
                          />
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            label="Last name"
                            type="text"
                            margin="none"
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                            variant="outlined"
                            error={errors.lastName && touched.lastName}
                            helperText={
                              errors.lastName && touched.lastName ? errors.lastName : null
                            }
                          />
                        </Grid>
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
                            helperText={
                              errors.password && touched.password ? errors.password : null
                            }
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
                          <TextField
                            fullWidth
                            label="Confirm password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            margin="none"
                            name="confirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                            variant="outlined"
                            error={errors.confirmPassword && touched.confirmPassword}
                            helperText={
                              errors.confirmPassword && touched.confirmPassword
                                ? errors.confirmPassword
                                : null
                            }
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownConfirmPassword}
                                  >
                                    {showConfirmPassword ? (
                                      <VisibilityIcon />
                                    ) : (
                                      <VisibilityOffIcon />
                                    )}
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
                            {isLoading ? 'Signing up' : 'Sign up now'}
                          </Button>
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <Typography className={classes.error} variant="body2" color="error">
                            {error || null}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Form>
                  </Grid>
                </Grid>
              </CardContent>
            </>
          );
        }}
      </Formik>
    </AuthTemplate>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUp: (firstName, lastName, email, password) =>
    dispatch(signUpAction(firstName, lastName, email, password)),
  cleanUp: () => dispatch(cleanAction()),
});

const mapStateToProps = (state) => {
  const { userId, error, isLoading } = state.auth;
  return { userId, error, isLoading };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
