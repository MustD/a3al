/**
 * Scanner actions
 */
export const SET_ARMA_FOLDER = 'sets/set_arma_folder';
export function setArmaFolder(path, isValid) {
  return { type: SET_ARMA_FOLDER, path, isValid };
}

