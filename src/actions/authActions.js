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

export const getUserById = () => (dispatch, getState) => {
  dispatch({ type: authTypes.GET_USER_START });

  return axios
    .get(`http://localhost:5000/api/users/${getState().auth.userId}`, {})
    .then(({ data }) => {
      dispatch({
        type: authTypes.GET_USER_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: authTypes.GET_USER_FAILURE,
        payload: {
          error: err.response,
        },
      });
    });
};

export const updateUserImage = (image) => (dispatch, getState) => {
  dispatch({ type: authTypes.UPLOAD_USER_IMAGE_START });

  const formData = new window.FormData();
  formData.append('image', image);
  return axios
    .patch(`http://localhost:5000/api/users/image/${getState().auth.userId}`, formData)
    .then(({ data }) => {
      dispatch({
        type: authTypes.UPLOAD_USER_IMAGE_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: authTypes.UPLOAD_USER_IMAGE_FAILURE,
        // payload: { error: err.response.data.message },
      });
    });
};
