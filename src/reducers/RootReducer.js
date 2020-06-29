import { itemTypes, authTypes } from '../actions/types';

const initialState = {
  userId: '5eef32769a68458ec7090f4f',
  budgetElements: [],
  categories: [],
  wallets: [],
  // userId: '',
  isLoading: false,
  error: null,
};

const RootReducer = (state = initialState, action) => {
  switch (action.type) {
    case itemTypes.ADD_ITEM_START:
      return {
        ...state,
        isLoading: true,
      };
    /* eslint-disable no-underscore-dangle */
    case authTypes.AUTH_SUCCESS:
      return {
        ...state,
        userID: action.payload.data._id,
      };
    case authTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        userID: action.payload.data.user._id,
      };

    case itemTypes.ADD_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        [action.payload.itemType]: [
          ...state[action.payload.itemType],
          action.payload.data[action.payload.itemType],
        ],
      };
    case authTypes.EDIT_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case itemTypes.FETCH_DATA_START:
      return {
        ...state,
        isLoading: true,
      };
    case itemTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [...action.payload.data[action.payload.itemType]],
        isLoading: false,
        error: null,
      };
    case itemTypes.FETCH_DATA_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case itemTypes.DELETE_ITEM_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [
          ...state[action.payload.itemType].filter((item) => item._id !== action.payload.id),
        ],
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
        [action.payload.itemType]: [
          ...state[action.payload.itemType].filter((item) => item.id !== action.payload.id),
          action.payload.data[action.payload.itemType],
        ],
      };
    default:
      return state;
  }
};
/* eslint-enable */
export default RootReducer;
