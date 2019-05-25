import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  SET_CURRENT_USER
} from '../actions/types'
import isEmpty from '../validation/is-empty';

const initialState = {
  token: localStorage.getItem('token'), // Token that we get back, local storage
  isAuthenticated: null,
  loading: true, // Set to true. Change to false once the request comes back.
  user: null
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      }
    case REGISTER_SUCCESS: 
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    default: 
      return state;
  }
}