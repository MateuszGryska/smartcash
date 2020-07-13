import React from 'react';
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
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { Formik, Form } from 'formik';
import { PasswordSectionSchema } from 'validation';

const PasswordSection = ({ isLoading, error }) => {
  const { enqueueSnackbar } = useSnackbar();
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
        onSubmit={(values) => {
          console.log(values);
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
                      type="password"
                      margin="dense"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      value={values.password}
                      variant="outlined"
                      error={errors.password && touched.password}
                    />
                    <FormHelperText>
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
                      type="password"
                      name="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      value={values.confirmPassword}
                      variant="outlined"
                      error={errors.confirmPassword && touched.confirmPassword}
                    />
                    <FormHelperText>
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

export default connect(mapStateToProps)(PasswordSection);
