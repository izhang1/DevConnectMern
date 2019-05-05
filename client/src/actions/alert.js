import { SET_ALERT, REMOVE_ALERT } from './types';
import uuid from 'uuid';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuid.v4(); // Returns ramdomized string
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id}
  });

  // Wait 5 seconds and then remove the alert
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id}), timeout);
};
