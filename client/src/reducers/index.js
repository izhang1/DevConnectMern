import { combineReducers } from 'redux';
import alert from './alert';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  // Takes in an object of any reducers we create
  alert,
  auth: authReducer,
  errors: errorReducer
});