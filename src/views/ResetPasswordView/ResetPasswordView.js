import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import {
  CardHeader,
  CardContent,
  Button,
  Grid,
  TextField,
  FormHelperText,
  FormControl,
  Typography,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { Formik, Form } from 'formik';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { PasswordSectionSchema } from 'validation';

import { setNewPassword as setNewPasswordAction } from 'actions';

const useStyles = makeStyles((theme) => ({
  root: {},

  contentHeader: {
    fontSize: '88px',
    paddingLeft: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  contentBody: {
    padding: theme.spacing(4),
  },

  error: {
    paddingTop: theme.spacing(2),
    textAlign: 'center',
  },
}));

const ResetPasswordView = ({ isLoading, error, setNewPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isLoading === false && error === false) {
      enqueueSnackbar('Password has been changed.', { variant: 'success' });
    }
  }, [error, isLoading, enqueueSnackbar]);

  const classes = useStyles();
  const { resetToken } = useParams();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <>
      <CardHeader
        className={classes.contentHeader}
        title="Reset password"
        subheader="Enter your new password."
      />
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={PasswordSectionSchema}
        onSubmit={async (values) => {
          await setNewPassword(values, resetToken);
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, isValid }) => {
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
                            label="New password"
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
                        <FormControl variant="outlined" fullWidth margin="dense">
                          <TextField
                            fullWidth
                            label="Confirm password"
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                            variant="outlined"
                            error={errors.confirmPassword && touched.confirmPassword}
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
                            {errors.confirmPassword && touched.confirmPassword
                              ? errors.confirmPassword
                              : null}
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
                          {isLoading ? 'Updating...' : 'Update password'}
                        </Button>
                      </Grid>
                      <Grid item md={12} xs={12}>
                        {isLoading === false && error === false ? (
                          <>
                            <Redirect to="/login" />
                          </>
                        ) : null}
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
          );
        }}
      </Formik>
    </>
  );
};

ResetPasswordView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setNewPassword: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

ResetPasswordView.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => {
  const { isLoading, error } = state.auth.setNewPassword;
  return { isLoading, error };
};

const mapDispatchToProps = (dispatch) => ({
  setNewPassword: (password, token) => dispatch(setNewPasswordAction(password, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordView);
