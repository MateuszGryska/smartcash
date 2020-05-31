import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid, CardHeader, CardContent, Typography, TextField, Button } from '@material-ui/core';
import { Formik } from 'formik';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AuthTemplate from '../../templates/AuthTemplate/AuthTemplate';

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
    padding: theme.spacing(4),
  },
  recoverPasswordText: {
    paddingTop: theme.spacing(2),
  },
}));

const RegisterView = () => {
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
        initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <CardContent className={classes.contentBody}>
            <Grid container spacing="2">
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
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Button fullWidth color="primary" variant="contained" type="submit">
                  Sign up now
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        )}
      </Formik>
    </AuthTemplate>
  );
};

export default RegisterView;
