import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  CardHeader,
  CardContent,
  Typography,
  FormHelperText,
  FormControl,
  TextField,
  Button,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { Formik, Form } from 'formik';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { routes } from 'routes';

import {
  sendResetPasswordMail as sendResetPasswordMailAction,
  clean as cleanAction,
} from 'actions';
import { ResetSchema } from 'validation';

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

const SendResetMailView = ({ sendResetPasswordMail, cleanUp, userId, error, isLoading }) => {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const classes = useStyles();
  return (
    <>
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
        title="Reset password"
        subheader="Reset password to SmartCash platform."
      />
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={ResetSchema}
        onSubmit={async (values) => {
          await sendResetPasswordMail(values);
          enqueueSnackbar('Check your email to reset your password.', { variant: 'info' });
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
                          <FormControl variant="outlined" fullWidth margin="dense">
                            <TextField
                              fullWidth
                              label="Email Address"
                              type="email"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              variant="outlined"
                              error={errors.email && touched.email}
                            />
                            <FormHelperText error>
                              {errors.email && touched.email ? errors.email : null}
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
                            {isLoading ? 'Sending...' : 'Send reset password mail'}
                          </Button>
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <Typography className={classes.error} variant="body2">
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
    </>
  );
};

SendResetMailView.propTypes = {
  sendResetPasswordMail: PropTypes.func.isRequired,
  cleanUp: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  isLoading: PropTypes.bool.isRequired,
};

SendResetMailView.defaultProps = {
  error: null,
};

const mapDispatchToProps = (dispatch) => ({
  sendResetPasswordMail: (email) => dispatch(sendResetPasswordMailAction(email)),
  cleanUp: () => dispatch(cleanAction()),
});

const mapStateToProps = (state) => {
  const { userId, error, isLoading } = state.auth;
  return { userId, error, isLoading };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendResetMailView);
