import axios from 'axios';
import { itemTypes } from 'actions/types';

export const addElement = (itemType, content) => (dispatch, getState) => {
  dispatch({ type: itemTypes.ADD_ITEM_START });

  return axios
    .post(
      `${process.env.REACT_APP_BACKEND_URL}/${itemType}`,
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

export const fetchDataByUserId = (itemType) => (dispatch, getState) => {
  dispatch({ type: itemTypes.FETCH_DATA_START });

  const storedData = JSON.parse(window.localStorage.getItem('userData'));

  let uid = getState().auth.userId;
  if (storedData && storedData.userId) {
    uid = storedData.userId;
  }

  const { CancelToken } = axios;
  const source = CancelToken.source();

  const fetchData = () =>
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/${itemType}/user/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        },
        { cancelToken: source.token },
      )
      .then(({ data }) => {
        return dispatch({
          type: itemTypes.FETCH_DATA_SUCCESS,
          payload: {
            data,
            itemType,
          },
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('cancelled');
        } else {
          dispatch({
            type: itemTypes.FETCH_DATA_FAILURE,
            payload: { error: err.response.data.message },
          });
        }
      });
  fetchData();

  return () => {
    source.cancel();
  };
};

export const updateElement = (itemType, id, content) => (dispatch, getState) => {
  dispatch({ type: itemTypes.UPDATE_ITEM_START });

  return axios
    .patch(
      `${process.env.REACT_APP_BACKEND_URL}/${itemType}/${id}`,
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
      dispatch({
        type: itemTypes.UPDATE_ITEM_FAILURE,
        payload: { error: err.response.data.message },
      });
    });
};

export const deleteElement = (itemType, id) => (dispatch, getState) => {
  dispatch({ type: itemTypes.DELETE_ITEM_START });

  const { CancelToken } = axios;
  const source = CancelToken.source();

  const deleteItem = (itemId) =>
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/${itemType}/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        },
        { cancelToken: source.token },
      )
      .then(() => {
        dispatch({
          type: itemTypes.DELETE_ITEM_SUCCESS,
          payload: {
            itemType,
            id: itemId,
          },
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('cancelled');
        } else {
          dispatch({
            type: itemTypes.DELETE_ITEM_FAILURE,
            payload: { error: err.response.data.message },
          });
        }
      });

  deleteItem(id);

  return () => {
    source.cancel();
  };
};

export const deleteElements = (itemType, arrayWithIds) => async (dispatch, getState) => {
  dispatch({ type: itemTypes.DELETE_ITEM_START });

  const { CancelToken } = axios;
  const source = CancelToken.source();

  const deleteItem = (itemId) =>
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/${itemType}/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        },
        { cancelToken: source.token },
      )
      .then(() => {
        dispatch({
          type: itemTypes.DELETE_ITEM_SUCCESS,
          payload: {
            itemType,
            id: itemId,
          },
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('cancelled');
        } else {
          dispatch({
            type: itemTypes.DELETE_ITEM_FAILURE,
            payload: { error: err.response.data.message },
          });
        }
      });

  /* eslint-disable */
  for (let i = 0; i < arrayWithIds.length; i++) {
    await deleteItem(arrayWithIds[i]);
  }
  /* eslint-enable */

  return () => {
    source.cancel();
  };
};
