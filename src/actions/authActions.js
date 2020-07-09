import axios from 'axios';
import { authTypes } from 'actions/types';

export const setUserId = (userId, token, expiration) => {
  return {
    type: 'SET_USER',
    payload: {
      userId,
      token,
      expiration,
    },
  };
};

export const authenticate = (email, password) => (dispatch) => {
  dispatch({ type: authTypes.AUTH_START });

  return axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
      ...email,
      ...password,
    })
    .then((payload) => {
      const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
      window.localStorage.setItem(
        'userData',
        JSON.stringify({
          userId: payload.data.userId,
          token: payload.data.token,
          expiration: tokenExpirationDate.toISOString(),
        }),
      );
      dispatch({
        type: authTypes.AUTH_SUCCESS,
        payload: { ...payload, expiration: tokenExpirationDate.toISOString() },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: authTypes.AUTH_FAILURE });
    });
};

export const signUp = (data) => (dispatch) => {
  dispatch({ type: authTypes.SIGNUP_START });

  return axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {
      ...data,
    })
    .then((payload) => {
      const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
      window.localStorage.setItem(
        'userData',
        JSON.stringify({
          userId: payload.data.userId,
          token: payload.data.token,
          expiration: tokenExpirationDate.toISOString(),
        }),
      );
      dispatch({
        type: authTypes.SIGNUP_SUCCESS,
        payload: { ...payload, expiration: tokenExpirationDate.toISOString() },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: authTypes.SIGNUP_FAILURE });
    });
};

export const editUser = (userData) => (dispatch, getState) => {
  dispatch({ type: authTypes.UPDATE_USER_START });

  return axios
    .patch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${getState().auth.userId}`,
      {
        ...userData,
      },
      {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      },
    )
    .then(({ data }) => {
      dispatch({
        type: authTypes.UPDATE_USER_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: authTypes.UPDATE_USER_FAILURE,
        payload: { error: err.response.data.message },
      });
    });
};

export const getUserById = () => (dispatch, getState) => {
  dispatch({ type: authTypes.GET_USER_START });

  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/users/${getState().auth.userId}`, {})
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
    .patch(`${process.env.REACT_APP_BACKEND_URL}/users/image/${getState().auth.userId}`, formData)
    .then(({ data }) => {
      dispatch({
        type: authTypes.UPLOAD_USER_IMAGE_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: authTypes.UPLOAD_USER_IMAGE_FAILURE,
        // payload: { error: err.response.data.message },
      });
    });
};

export const logout = () => {
  window.localStorage.removeItem('userData');

  return {
    type: 'LOG_OUT_USER',
  };
};
