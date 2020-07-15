import { combineReducers } from 'redux';
import authReducer from 'reducers/authReducer';
import itemsReducer from 'reducers/itemsReducer';

const appReducer = combineReducers({
  auth: authReducer,
  items: itemsReducer,
});

const RootReducer = (state, action) => {
  if (action.type === 'LOG_OUT_USER') {
    // eslint-disable-next-line
    state = undefined;
  }

  return appReducer(state, action);
};

export default RootReducer;
