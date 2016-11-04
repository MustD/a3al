/**
 * Created by md on 10.09.16.
 */
export const ADD_SET = 'sets/add_set';
export const REMOVE_SET = 'sets/remove_set';
export const ACTIVATE = 'sets/activate';
export const UPDATE_SET = 'sets/update_set';


export function addSet(id) {
  return {
    type: ADD_SET,
    id,
  };
}

export function removeSet(id) {
  return {
    type: REMOVE_SET,
    id,
  }
}

export function activate(id) {
  return {
    type: ACTIVATE,
    id,
  }
}

export function updateSet(id, data) {
  return {
    type: UPDATE_SET,
    id, data,
  }
}
