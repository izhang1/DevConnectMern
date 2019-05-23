import { combineReducers } from 'redux';
import alert from './alert';
import authReducer from './auth';

export default combineReducers({
  // Takes in an object of any reducers we create
  alert,
  auth: authReducer
});