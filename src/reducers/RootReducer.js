import {
  ADD_ITEM_START,
  ADD_ITEM_SUCCESS,
  EDIT_USER_SUCCESS,
  FETCH_DATA_SUCCESS,
  AUTH_SUCCESS,
  SIGNUP_SUCCESS,
} from '../actions';

const initialState = {
  userId: '5eef32769a68458ec7090f4f',
  // userId: '',
  isLoading: false,
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
    /* eslint-enable */
    case ADD_ITEM_SUCCESS:
      return {
        ...state,
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
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [...action.payload.data[action.payload.itemType]],
      };
    default:
      return state;
  }
};

export default RootReducer;
