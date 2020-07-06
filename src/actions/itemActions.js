import axios from 'axios';
import { itemTypes } from './types';

export const addElement = (itemType, content) => (dispatch, getState) => {
  dispatch({ type: itemTypes.ADD_ITEM_START });

  return axios
    .post(
      `http://localhost:5000/api/${itemType}`,
      {
        user: getState().auth.userId,
        ...content,
      },
      {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      },
    )
    .then(({ data }) => {
      dispatch({
        type: itemTypes.ADD_ITEM_SUCCESS,
        payload: {
          itemType,
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({ type: itemTypes.ADD_ITEM_FAILURE });
    });
};

export const fetchDataByUserId = (itemURL, itemType) => (dispatch, getState) => {
  dispatch({ type: itemTypes.FETCH_DATA_START });

  const storedData = JSON.parse(window.localStorage.getItem('userData'));

  let uid = getState().auth.userId;
  if (storedData && storedData.userId) {
    uid = storedData.userId;
  }

  return axios
    .get(`http://localhost:5000/api/${itemURL}/user/${uid}`, {
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
      },
    })
    .then(({ data }) => {
      dispatch({
        type: itemTypes.FETCH_DATA_SUCCESS,
        payload: {
          data,
          itemType,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: itemTypes.FETCH_DATA_FAILURE,
        payload: {
          error: err.response,
        },
      });
    });
};

export const updateElement = (itemType, id, content) => (dispatch, getState) => {
  dispatch({ type: itemTypes.UPDATE_ITEM_START });

  return axios
    .patch(
      `http://localhost:5000/api/${itemType}/${id}`,
      {
        ...content,
      },
      {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      },
    )
    .then(({ data }) => {
      dispatch({
        type: itemTypes.UPDATE_ITEM_SUCCESS,
        payload: {
          itemType,
          id,
          data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: itemTypes.UPDATE_ITEM_FAILURE,
        payload: { error: err.response.data.message },
      });
    });
};

export const deleteElement = (itemType, id) => (dispatch, getState) => {
  dispatch({ type: itemTypes.DELETE_ITEM_START });

  return axios
    .delete(`http://localhost:5000/api/${itemType}/${id}`, {
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
      },
    })
    .then(() => {
      dispatch({
        type: itemTypes.DELETE_ITEM_SUCCESS,
        payload: {
          itemType,
          id,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: itemTypes.DELETE_ITEM_FAILURE,
        payload: { error: err.response.data.message },
      });
    });
};
