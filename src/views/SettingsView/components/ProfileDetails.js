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
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    helperText="Please specify the first name"
                    label="First name"
                    margin="dense"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    value={values.firstName}
                    variant="outlined"
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
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Button color="primary" variant="contained" type="submit" disabled={isSubmitting}>
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
