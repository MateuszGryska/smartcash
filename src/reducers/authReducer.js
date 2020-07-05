import { authTypes } from '../actions/types';

const initialState = {
  // userId: '5eef32769a68458ec7090f4f',
  userId: '5f01bddf75f2312f19fb3e47',
  user: {},
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

    case authTypes.GET_USER_START:
      return {
        ...state,
        isLoading: true,
      };
    case authTypes.GET_USER_SUCCESS:
      return {
        ...state,
        ...payload.data,
        isLoading: false,
        error: null,
      };
    case authTypes.UPLOAD_USER_IMAGE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload.data,
        },
      };

    default:
      return state;
  }
};
/* eslint-enable */
