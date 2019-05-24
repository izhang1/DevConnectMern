import axios from 'axios'
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  GET_ERRORS
} from './types'
// Load user
export const loadUser = () => async dispatch => {

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

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};