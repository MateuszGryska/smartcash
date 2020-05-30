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

const PasswordSection = () => {
  return (
    <Card>
      <CardHeader title="Password" subheader="Update password" />
      <Divider />

      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
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
                    label="Password"
                    type="password"
                    margin="dense"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    value={values.password}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
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
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Button color="primary" variant="contained" type="submit" disabled={isSubmitting}>
                update
              </Button>
            </CardActions>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default PasswordSection;
