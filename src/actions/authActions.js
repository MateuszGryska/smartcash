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
      dispatch({ type: authTypes.AUTH_FAILURE, payload: { error: err.response.data.message } });
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
      dispatch({ type: authTypes.SIGNUP_FAILURE, payload: { error: err.response.data.message } });
    });
};

export const updateUser = (userData) => (dispatch, getState) => {
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
      dispatch({
        type: authTypes.GET_USER_FAILURE,
        payload: { error: err.response.data.message },
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
      dispatch({
        type: authTypes.UPLOAD_USER_IMAGE_FAILURE,
        payload: { error: err.response.data.message },
      });
    });
};

export const logout = () => {
  window.localStorage.removeItem('userData');

  return {
    type: 'LOG_OUT_USER',
  };
};

export const updatePassword = (password) => (dispatch, getState) => {
  dispatch({ type: authTypes.UPDATE_PASSWORD_START });

  return axios
    .patch(
      `${process.env.REACT_APP_BACKEND_URL}/users/password/${getState().auth.userId}`,
      {
        ...password,
      },
      {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      },
    )
    .then(({ data }) => {
      dispatch({
        type: authTypes.UPDATE_PASSWORD_SUCCESS,
        payload: {
          data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: authTypes.UPDATE_PASSWORD_FAILURE,
        payload: { error: err.response.data.message },
      });
    });
};

export const deleteUser = () => (dispatch, getState) => {
  dispatch({ type: authTypes.DELETE_USER_START });

  return axios
    .delete(`${process.env.REACT_APP_BACKEND_URL}/users/${getState().auth.userId}`, {
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
      },
    })
    .then(() => {
      dispatch({
        type: authTypes.DELETE_USER_SUCCESS,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: authTypes.DELETE_USER_FAILURE,
        payload: { error: err.response.data.message },
      });
    });
};

export const sendResetPasswordMail = (email) => (dispatch) => {
  dispatch({ type: authTypes.SEND_RESET_MAIL_START });

  return axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/users/reset-password`, {
      ...email,
    })
    .then(({ data }) => {
      dispatch({
        type: authTypes.SEND_RESET_MAIL_SUCCESS,
        payload: {
          error: data.message,
        },
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: authTypes.SEND_RESET_MAIL_FAILURE,
        payload: { error: err.response.data.message },
      });
    });
};

export const setNewPassword = (password, resetToken) => (dispatch) => {
  dispatch({ type: authTypes.SET_NEW_PASSWORD_START });

  return axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/users/new-password/`, {
      ...password,
      resetToken,
    })
    .then(({ data }) => {
      dispatch({
        type: authTypes.SET_NEW_PASSWORD_SUCCESS,
        payload: {
          error: data.message,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: authTypes.SET_NEW_PASSWORD_FAILURE,
        payload: { error: err.response.data.message },
      });
    });
};

// clean up messages
export const clean = () => ({
  type: authTypes.CLEAN_UP,
});
