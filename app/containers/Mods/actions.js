/**
 * Created by md on 10.09.16.
 */
export const ADD_MOD = 'mods/add_mod';
export const REMOVE_MOD = 'mods/remove_mod';

export function addMod(id, name) {
  return {
    type: ADD_MOD,
    id, name,
  };
}

export function removeMod(id) {
  return {
    type: REMOVE_MOD,
    id,
  }
}

