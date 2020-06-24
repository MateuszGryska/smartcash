import axios from 'axios';

export const ADD_ITEM_START = 'ADD_ITEM_START';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';

export const FETCH_DATA_START = 'FETCH_DATA_START';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const EDIT_USER_START = 'EDIT_USER_START';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE';

export const authenticate = (email, password) => (dispatch) => {
  dispatch({ type: AUTH_START });

  return axios
    .post('http://localhost:5000/api/users/login', {
      email,
      password,
    })
    .then((payload) => {
      console.log(payload);
      dispatch({ type: AUTH_SUCCESS, payload });
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({ type: AUTH_FAILURE });
    });
};

export const signUp = (data) => (dispatch) => {
  dispatch({ type: SIGNUP_START });

  return axios
    .post('http://localhost:5000/api/users/signup', {
      ...data,
    })
    .then((payload) => {
      console.log(payload);
      dispatch({ type: SIGNUP_SUCCESS, payload });
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({ type: SIGNUP_FAILURE });
    });
};

export const addElement = (itemType, content) => (dispatch, getState) => {
  dispatch({ type: ADD_ITEM_START });

  return axios
    .post(`http://localhost:5000/api/${itemType}`, {
      user: getState().userId,
      ...content,
    })
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: ADD_ITEM_SUCCESS,
        payload: {
          itemType,
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: ADD_ITEM_FAILURE });
    });
};

export const fetchDataByUserId = (itemURL, itemType) => (dispatch, getState) => {
  dispatch({ type: FETCH_DATA_START });

  return axios
    .get(`http://localhost:5000/api/${itemURL}/user/${getState().userId}`, {})
    .then(({ data }) => {
      dispatch({
        type: FETCH_DATA_SUCCESS,
        payload: {
          data,
          itemType,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: FETCH_DATA_FAILURE });
    });
};

export const editUser = (data) => {
  return {
    type: EDIT_USER_SUCCESS,
    payload: {
      ...data,
    },
  };
};
