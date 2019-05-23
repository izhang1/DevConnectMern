import axios from 'axios'
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from './types'
import setAuthToken from '../utils/setAuthToken';


// Load user
export const loadUser = () => async dispatch => {
  // Check if there's a token and save it into the header
  if(localStorage.token) {
    setAuthToken(localStorage.token);
  } 

  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
    payload: res.data
    });
  } catch {
    dispatch({
      type: AUTH_ERROR
    });
  }
}

// Register the user
export const register = ({ name,  email, password }) => async dispatch => {
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users/register', body, config);
    dispatch({
      type: REGISTER_SUCCESS, 
      payload: res.data
    });
  } catch (err) {
    // Get the array of errors and dispatch them
    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach(error => dispatch(setAlert(error[1],'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    })
  }
}