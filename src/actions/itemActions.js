import axios from 'axios';
import { itemTypes } from './types';

export const addElement = (itemType, content) => (dispatch, getState) => {
  dispatch({ type: itemTypes.ADD_ITEM_START });

  return axios
    .post(`http://localhost:5000/api/${itemType}`, {
      user: getState().auth.userId,
      ...content,
    })
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
      dispatch({ type: itemTypes.ADD_ITEM_FAILURE, payload: { error: err.response.data.message } });
    });
};

export const fetchDataByUserId = (itemURL, itemType) => (dispatch, getState) => {
  dispatch({ type: itemTypes.FETCH_DATA_START });

  return axios
    .get(`http://localhost:5000/api/${itemURL}/user/${getState().auth.userId}`, {})
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
      dispatch({
        type: itemTypes.FETCH_DATA_FAILURE,
        payload: {
          error: err.response.data.message,
        },
      });
    });
};

export const updateElement = (itemType, id, content) => (dispatch) => {
  dispatch({ type: itemTypes.UPDATE_ITEM_START });

  return axios
    .patch(`http://localhost:5000/api/${itemType}/${id}`, {
      ...content,
    })
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

export const deleteElement = (itemType, id) => (dispatch) => {
  dispatch({ type: itemTypes.DELETE_ITEM_START });

  return axios
    .delete(`http://localhost:5000/api/${itemType}/${id}`)
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
