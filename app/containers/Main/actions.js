/**
 * Created by md on 10.09.16.
 */
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
export const SET_STATE = 'main/set_state';
export const ADD_MOD = 'main/add_mod';

export function setState(data) {
  return {
    type: SET_STATE,
    data,
  }
}

export function addMod(id) {
  return {
    type: ADD_MOD,
    id,
  };
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

export function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function incrementAsync(delay = 1000) {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}
