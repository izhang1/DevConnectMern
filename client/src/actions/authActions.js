import axios from 'axios'
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {
  REGISTER_SUCCESS,
  SET_CURRENT_USER,
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

// Login - Get User token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
        // Save to local storage
        const { token } = res.data;
        // Set the token to local storage
        localStorage.setItem('jwtToken', token);
        // Set the token to the auth header 
        setAuthToken(token);
        // Token includes the user information as well. Decode token to get user data. 
        const decoded = jwt_decode(token);
        // Set current user 
        dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// Set logged in user
export const setCurrentUser = (decoded) => {
  // Send along user and decoded information
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
} 