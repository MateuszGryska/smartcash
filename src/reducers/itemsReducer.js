import { itemTypes } from 'actions/types';

const initialState = {
  budgetElements: [],
  wallets: [],
  categories: [],
  isLoading: false,
  error: null,
  deleteItem: {
    error: null,
    isLoading: false,
  },
  fetchData: {
    error: null,
    isLoading: false,
  },
  updateItem: {
    error: null,
    isLoading: false,
  },
};

// helper functions

/* eslint-disable no-underscore-dangle */
const addItemStart = (state) => {
  return {
    ...state,
    isLoading: true,
  };
};

const addItemSuccess = (state, payload) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    [payload.itemType]: [...state[payload.itemType], payload.data[payload.itemType]],
  };
};

const addItemFailure = (state, payload) => {
  return {
    ...state,
    isLoading: false,
    error: payload.error,
  };
};

const fetchDataStart = (state) => {
  return {
    ...state,
    fetchData: {
      ...state.fetchData,
      isLoading: true,
    },
  };
};

const fetchDataSuccess = (state, payload) => {
  return {
    ...state,
    [payload.itemType]: [...payload.data[payload.itemType]],
    fetchData: {
      ...state.fetchData,
      isLoading: false,
      error: false,
    },
  };
};

const fetchDataFailure = (state, payload) => {
  return {
    ...state,
    fetchData: {
      ...state.fetchData,
      error: payload.error,
      isLoading: false,
    },
  };
};

const deleteItemStart = (state) => {
  return {
    ...state,
    deleteItem: {
      ...state.deleteItem,
      isLoading: true,
    },
  };
};

const deleteItemSuccess = (state, payload) => {
  return {
    ...state,
    budgetElements: [
      ...state.budgetElements.filter((item) =>
        payload.itemType === 'categories'
          ? item.category !== payload.id
          : item.wallet !== payload.id,
      ),
    ],
    [payload.itemType]: [...state[payload.itemType].filter((item) => item._id !== payload.id)],
    deleteItem: {
      ...state.deleteItem,
      isLoading: false,
      error: false,
    },
  };
};

const deleteItemFailure = (state, payload) => {
  return {
    ...state,

    deleteItem: {
      ...state.deleteItem,
      isLoading: false,
      error: payload.error,
    },
  };
};

const updateItemStart = (state) => {
  return {
    ...state,
    updateItem: {
      ...state.updateItem,
      isLoading: true,
    },
  };
};

const updateItemSuccess = (state, payload) => {
  return {
    ...state,
    [payload.itemType]: [
      ...state[payload.itemType].filter((item) => item.id !== payload.id),
      payload.data[payload.itemType],
    ],
    updateItem: {
      ...state.updateItem,
      isLoading: false,
      error: false,
    },
  };
};

const updateItemFailure = (state, payload) => {
  return {
    ...state,
    updateItem: {
      ...state.updateItem,
      isLoading: false,
      error: payload.error,
    },
  };
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case itemTypes.ADD_ITEM_START:
      return addItemStart(state);
    case itemTypes.ADD_ITEM_SUCCESS:
      return addItemSuccess(state, payload);
    case itemTypes.ADD_ITEM_FAILURE:
      return addItemFailure(state, payload);
    case itemTypes.FETCH_DATA_START:
      return fetchDataStart(state);
    case itemTypes.FETCH_DATA_SUCCESS:
      return fetchDataSuccess(state, payload);
    case itemTypes.FETCH_DATA_FAILURE:
      return fetchDataFailure(state, payload);
    case itemTypes.DELETE_ITEM_START:
      return deleteItemStart(state);
    case itemTypes.DELETE_ITEM_SUCCESS:
      return deleteItemSuccess(state, payload);
    case itemTypes.DELETE_ITEM_FAILURE:
      return deleteItemFailure(state, payload);
    case itemTypes.UPDATE_ITEM_START:
      return updateItemStart(state);
    case itemTypes.UPDATE_ITEM_SUCCESS:
      return updateItemSuccess(state, payload);
    case itemTypes.UPDATE_ITEM_FAILURE:
      return updateItemFailure(state, payload);
    default:
      return state;
  }
};
/* eslint-enable */
