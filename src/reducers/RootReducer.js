import {
  ADD_ITEM_START,
  ADD_ITEM_SUCCESS,
  EDIT_USER_SUCCESS,
  FETCH_DATA_SUCCESS,
  AUTH_SUCCESS,
  SIGNUP_SUCCESS,
  DELETE_ITEM_SUCCESS,
  FETCH_DATA_START,
  FETCH_DATA_FAILURE,
} from '../actions';

const initialState = {
  userId: '5eef32769a68458ec7090f4f',
  budgetElements: [],
  // userId: '',
  isLoading: false,
  error: null,
};

const RootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_START:
      return {
        ...state,
        isLoading: true,
      };
    /* eslint-disable no-underscore-dangle */
    case AUTH_SUCCESS:
      return {
        ...state,
        userID: action.payload.data._id,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        userID: action.payload.data.user._id,
      };

    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        [action.payload.itemType]: [
          ...state[action.payload.itemType],
          action.payload.data[action.payload.itemType],
        ],
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case FETCH_DATA_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [...action.payload.data[action.payload.itemType]],
        isLoading: false,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [
          ...state[action.payload.itemType].filter((item) => item._id !== action.payload.id),
        ],
      };
    default:
      return state;
  }
};
/* eslint-enable */
export default RootReducer;
