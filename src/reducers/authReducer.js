import { authTypes } from '../actions/types';

const initialState = {
  userId: '',
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
        userId: payload.data.userId,
        token: payload.data.token,
        expiration: payload.expiration,
      };
    case authTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        userId: payload.data.userId,
        token: payload.data.token,
        expiration: payload.expiration,
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
    case 'SET_USER':
      return {
        ...state,
        ...payload,
      };
    case 'LOG_OUT_USER':
      return {
        ...state,
        userId: '',
        token: '',
        expiration: '',
      };

    default:
      return state;
  }
};
/* eslint-enable */
