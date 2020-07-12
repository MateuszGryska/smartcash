import React from 'react';
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
import { editUser as editUserAction } from 'actions';
import { ProfileDetailsSchema } from 'validation';

const ProfileDetails = ({ editUser, userData, isLoading, error }) => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Card>
      <CardHeader title="Profile" subheader="The information can be edited" />
      <Divider />

      <Formik
        initialValues={{
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          country: userData.country,
        }}
        validationSchema={ProfileDetailsSchema}
        onSubmit={async (values) => {
          await editUser(values);
          if (!isLoading && error === null) {
            enqueueSnackbar('The user has been updated!', { variant: 'success' });
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
                      label="First name"
                      margin="dense"
                      name="firstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      value={values.firstName}
                      variant="outlined"
                      error={errors.firstName && touched.firstName}
                    />
                    <FormHelperText>
                      {errors.firstName && touched.firstName ? errors.firstName : null}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl variant="outlined" fullWidth margin="dense">
                    <TextField
                      fullWidth
                      label="Last name"
                      margin="dense"
                      name="lastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      value={values.lastName}
                      variant="outlined"
                      error={errors.lastName && touched.lastName}
                    />
                    <FormHelperText>
                      {errors.lastName && touched.lastName ? errors.lastName : null}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl variant="outlined" fullWidth margin="dense">
                    <TextField
                      fullWidth
                      label="Email"
                      margin="dense"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="email"
                      required
                      value={values.email}
                      variant="outlined"
                      error={errors.email && touched.email}
                    />
                    <FormHelperText>
                      {errors.email && touched.email ? errors.email : null}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl variant="outlined" fullWidth margin="dense">
                    <TextField
                      fullWidth
                      label="Phone number"
                      margin="dense"
                      name="phoneNumber"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="number"
                      value={values.phoneNumber}
                      variant="outlined"
                      error={errors.phoneNumber && touched.phoneNumber}
                    />
                    <FormHelperText>
                      {errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : null}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl variant="outlined" fullWidth margin="dense">
                    <TextField
                      fullWidth
                      label="Country"
                      margin="dense"
                      name="country"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.country}
                      variant="outlined"
                      error={errors.country && touched.country}
                    />
                    <FormHelperText>
                      {errors.country && touched.country ? errors.country : null}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Typography variant="body2" color="error">
                    {error || null}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Button color="primary" variant="contained" type="submit" disabled={!isValid}>
                Save details
              </Button>
            </CardActions>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

const mapStateToProps = (state) => {
  const { isLoading, error } = state.auth;
  return { isLoading, error };
};

const mapDispatchToProps = (dispatch) => ({
  editUser: (data) => dispatch(editUserAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails);
