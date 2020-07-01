import { authTypes } from '../actions/types';

const initialState = {
  userId: '5eef32769a68458ec7090f4f',
  isLoading: false,
  error: null,
};
/* eslint-disable no-underscore-dangle */
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case authTypes.AUTH_SUCCESS:
      return {
        ...state,
        userID: payload.data._id,
      };
    case authTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        userID: payload.data.user._id,
      };
    case authTypes.EDIT_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, payload],
      };
    default:
      return state;
  }
};
/* eslint-enable */