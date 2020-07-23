import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Divider,
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

import { updatePassword as updatePasswordAction } from 'actions';

const PasswordSection = ({ isLoading, error, updatePassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <Card>
      <CardHeader title="Password" subheader="Update password" />
      <Divider />

      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={PasswordSectionSchema}
        onSubmit={async (values) => {
          await updatePassword(values);
          if (!isLoading && error === null) {
            enqueueSnackbar('Password has been updated!', { variant: 'success' });
          }
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, isValid }) => (
          <Form>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <FormControl variant="outlined" fullWidth margin="dense">
                    <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      margin="dense"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
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

                <Grid item md={6} xs={12}>
                  <FormControl variant="outlined" fullWidth margin="dense">
                    <TextField
                      fullWidth
                      label="Confirm password"
                      margin="dense"
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
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
              </Grid>
              <Grid item md={12} xs={12}>
                <Typography variant="body2" color="error">
                  {error || null}
                </Typography>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Button color="primary" variant="contained" type="submit" disabled={!isValid}>
                update
              </Button>
            </CardActions>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

PasswordSection.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

PasswordSection.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => {
  const { isLoading, error } = state.auth;
  return { isLoading, error };
};

const mapDispatchToProps = (dispatch) => ({
  updatePassword: (password) => dispatch(updatePasswordAction(password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordSection);
