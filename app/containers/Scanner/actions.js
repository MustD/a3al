/**
 * Scanner actions
 */
export const SET_ARMA_FOLDER = 'scanner/set_arma_folder';
export function setArmaFolder(path, isValid) {
  return { type: SET_ARMA_FOLDER, path, isValid };
}

export const SET_WORKSHOP_MOD_LIST = 'scanner/set_workshop_mod_list';
export function setWorkshopMods(mods) {
  return { type: SET_WORKSHOP_MOD_LIST, mods}
}
