/**
 * Created by md on 10.09.16.
 */
export const SET_STATE = 'main/set_state';

export function setState(data) {
  return {
    type: SET_STATE,
    data,
  }
}
