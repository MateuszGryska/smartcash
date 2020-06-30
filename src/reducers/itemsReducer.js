import { itemTypes } from '../actions/types';

const initialState = {
  budgetElements: [],
  categories: [],
  wallets: [],
  isLoading: false,
  error: null,
};

/* eslint-disable no-underscore-dangle */
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case itemTypes.ADD_ITEM_START:
      return {
        ...state,
        isLoading: true,
      };

    case itemTypes.ADD_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        [payload.itemType]: [...state[payload.itemType], payload.data[payload.itemType]],
      };

    case itemTypes.FETCH_DATA_START:
      return {
        ...state,
        isLoading: true,
      };
    case itemTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        [payload.itemType]: [...payload.data[payload.itemType]],
        isLoading: false,
        error: null,
      };
    case itemTypes.FETCH_DATA_FAILURE:
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };
    case itemTypes.DELETE_ITEM_SUCCESS:
      return {
        ...state,
        [payload.itemType]: [...state[payload.itemType].filter((item) => item._id !== payload.id)],
      };
    case itemTypes.UPDATE_ITEM_START:
      return {
        ...state,
        isLoading: true,
      };
    case itemTypes.UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        [payload.itemType]: [
          ...state[payload.itemType].filter((item) => item.id !== payload.id),
          payload.data[payload.itemType],
        ],
      };
    default:
      return state;
  }
};
/* eslint-enable */
