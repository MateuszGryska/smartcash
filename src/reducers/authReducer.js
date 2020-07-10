import { authTypes } from 'actions/types';

const initialState = {
  userId: '',
  user: {},
  isLoading: false,
  error: null,
};

// helper functions
const authStart = (state) => {
  return {
    ...state,
    isLoading: true,
  };
};

const authSuccess = (state, payload) => {
  return {
    ...state,
    userId: payload.data.userId,
    token: payload.data.token,
    expiration: payload.expiration,
    isLoading: false,
  };
};

const authFailure = (state, payload) => {
  return {
    ...state,
    isLoading: false,
    error: payload.error,
  };
};

const signUpStart = (state) => {
  return {
    ...state,
    isLoading: true,
  };
};

const signUpSuccess = (state, payload) => {
  return {
    ...state,
    userId: payload.data.userId,
    token: payload.data.token,
    expiration: payload.expiration,
    isLoading: false,
  };
};

const signUpFailure = (state, payload) => {
  return {
    ...state,
    isLoading: false,
    error: payload.error,
  };
};

const editUserStart = (state) => {
  return {
    ...state,
    isLoading: true,
  };
};

const editUserSuccess = (state, payload) => {
  return {
    ...state,
    users: [...state.users, payload],
    isLoading: false,
  };
};

const editUserFailure = (state, payload) => {
  return {
    ...state,
    isLoading: false,
    error: payload.error,
  };
};

const getUserStart = (state) => {
  return {
    ...state,
    isLoading: true,
  };
};

const getUserSuccess = (state, payload) => {
  return {
    ...state,
    ...payload.data,
    isLoading: false,
    error: null,
  };
};

const getUserFailure = (state, payload) => {
  return {
    ...state,
    isLoading: false,
    error: payload.error,
  };
};

const uploadUserImageStart = (state) => {
  return {
    ...state,
    isLoading: true,
  };
};

const uploadUserImageSuccess = (state, payload) => {
  return {
    ...state,
    user: {
      ...state.user,
      ...payload.data,
    },
    isLoading: false,
    error: null,
  };
};

const uploadUserImageFailure = (state, payload) => {
  return {
    ...state,
    isLoading: false,
    error: payload.error,
  };
};

const updateUserStart = (state) => {
  return {
    ...state,
    isLoading: true,
  };
};

const updateUserSuccess = (state, payload) => {
  return {
    ...state,
    user: { ...payload.data.users },
    isLoading: false,
    error: null,
  };
};

const updateUserFailure = (state, payload) => {
  return {
    ...state,
    isLoading: false,
    error: payload.error,
  };
};

/* eslint-disable no-underscore-dangle */
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case authTypes.AUTH_START:
      return authStart(state);
    case authTypes.AUTH_SUCCESS:
      return authSuccess(state, payload);
    case authTypes.AUTH_FAILURE:
      return authFailure(state, payload);
    case authTypes.SIGNUP_START:
      return signUpStart(state);
    case authTypes.SIGNUP_SUCCESS:
      return signUpSuccess(state, payload);
    case authTypes.SIGNUP_FAILURE:
      return signUpFailure(state, payload);
    case authTypes.EDIT_USER_START:
      return editUserStart(state);
    case authTypes.EDIT_USER_SUCCESS:
      return editUserSuccess(state, payload);
    case authTypes.EDIT_USER_FAILURE:
      return editUserFailure(state, payload);
    case authTypes.GET_USER_START:
      return getUserStart(state);
    case authTypes.GET_USER_SUCCESS:
      return getUserSuccess(state, payload);
    case authTypes.GET_USER_FAILURE:
      return getUserFailure(state, payload);
    case authTypes.UPLOAD_USER_IMAGE_START:
      return uploadUserImageStart(state);
    case authTypes.UPLOAD_USER_IMAGE_SUCCESS:
      return uploadUserImageSuccess(state, payload);
    case authTypes.UPLOAD_USER_IMAGE_FAILURE:
      return uploadUserImageFailure(state, payload);
    case authTypes.UPDATE_USER_START:
      return updateUserStart(state);
    case authTypes.UPDATE_USER_SUCCESS:
      return updateUserSuccess(state, payload);
    case authTypes.UPDATE_USER_FAILURE:
      return updateUserFailure(state, payload);
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
