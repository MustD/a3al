/**
 * Created by md on 14.01.17.
 */
export const ADD_SET = 'sets/add_set';


export function addSet(id) {
  return {
    type: ADD_SET,
    id,
  };
}

