import { combineReducers } from 'redux';
import authReducer from './authReducer';
import itemsReducer from './itemsReducer';

const RootReducer = combineReducers({
  auth: authReducer,
  items: itemsReducer,
});

export default RootReducer;
