import { combineReducers } from 'redux';
import authReducer from 'reducers/authReducer';
import itemsReducer from 'reducers/itemsReducer';

const RootReducer = combineReducers({
  auth: authReducer,
  items: itemsReducer,
});

export default RootReducer;
