import React from 'react';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Divider,
  Button,
  Grid,
  TextField,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import { ProfileDetailsSchema } from '../../../validation';

const ProfileDetails = () => {
  return (
    <Card>
      <CardHeader title="Profile" subheader="The information can be edited" />
      <Divider />

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          country: '',
        }}
        validationSchema={ProfileDetailsSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, isValid }) => (
          <Form>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
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
                    helperText={errors.firstName && touched.firstName ? errors.firstName : null}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
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
                    helperText={errors.lastName && touched.lastName ? errors.lastName : null}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
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
                    helperText={errors.email && touched.email ? errors.email : null}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
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
                    helperText={
                      errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : null
                    }
                  />
                </Grid>
                <Grid item md={6} xs={12}>
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
                    helperText={errors.country && touched.country ? errors.country : null}
                  />
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

export default ProfileDetails;
