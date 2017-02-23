/**
 * Folder
 */
import fs from 'fs';

export default class Folder {

  constructor(path = '') {
    this.path = path;
    this.logger = (m) => console.warn(m);
  }

  isValid() {
    return this.checkFolder();
  }

  setLogger(func = (m) => console.warn(m)){
    this.logger = func;
  }

  setPath(path) {
    this.path = path;
  }

  getPath() {
    return fs.realpathSync(this.path);
  }

  checkFolder() {
    try {
      if(this.path === '') {
        throw new Error('Path is empty');
      }
      const realPath = fs.realpathSync(this.path);
      fs.accessSync(realPath, fs.constants.F_OK);
    } catch (e){
      this.logger(e.message);
      return false;
    }
    return true;
  }
}
