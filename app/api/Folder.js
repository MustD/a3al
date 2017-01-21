/**
 * Folder
 */
import fs from 'fs';

export default class Folder {

  constructor(path = '') {
    this.path = path;
  }

  isValid() {
    return this.checkFolder();
  }

  setPath(path) {
    this.path = path;
  }

  getPath() {
    return this.path;
  }

  checkFolder() {
    try{
      if(this.path === '') {
        throw new Error('Path is empty');
      }
      fs.accessSync(this.path, fs.constants.F_OK);
    } catch (Error){
      return false;
    }
    return true;
  }

  getContent() {
    return fs.readdirSync(this.path);
  }
}
