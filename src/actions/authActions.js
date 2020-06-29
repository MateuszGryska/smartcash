import axios from 'axios';
import { authTypes } from './types';

export const authenticate = (email, password) => (dispatch) => {
  dispatch({ type: authTypes.AUTH_START });

  return axios
    .post('http://localhost:5000/api/users/login', {
      email,
      password,
    })
    .then((payload) => {
      console.log(payload);
      dispatch({ type: authTypes.AUTH_SUCCESS, payload });
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({ type: authTypes.AUTH_FAILURE });
    });
};

export const signUp = (data) => (dispatch) => {
  dispatch({ type: authTypes.SIGNUP_START });

  return axios
    .post('http://localhost:5000/api/users/signup', {
      ...data,
    })
    .then((payload) => {
      console.log(payload);
      dispatch({ type: authTypes.SIGNUP_SUCCESS, payload });
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({ type: authTypes.SIGNUP_FAILURE });
    });
};

export const editUser = (data) => {
  return {
    type: authTypes.EDIT_USER_SUCCESS,
    payload: {
      ...data,
    },
  };
};
