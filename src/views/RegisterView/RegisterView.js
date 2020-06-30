import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid, CardHeader, CardContent, Typography, TextField, Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { routes } from '../../routes';
import AuthTemplate from '../../templates/AuthTemplate/AuthTemplate';
import { signUp as signUpAction } from '../../actions';
import { RegisterSchema } from '../../validation';

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
  recoverPasswordText: {
    paddingTop: theme.spacing(2),
  },
}));

const RegisterView = ({ signUp, userId }) => {
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
          console.log(values);
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
                <Grid container spacing="2">
                  <Form>
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
                        helperText={errors.firstName && touched.firstName ? errors.firstName : null}
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
                        helperText={errors.lastName && touched.lastName ? errors.lastName : null}
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
                        type="password"
                        margin="none"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        variant="outlined"
                        error={errors.password && touched.password}
                        helperText={errors.password && touched.password ? errors.password : null}
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Confirm password"
                        type="password"
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
                        Sign up now
                      </Button>
                    </Grid>
                  </Form>
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
});

const mapStateToProps = (state) => {
  const { userId } = state.auth;
  return { userId };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
