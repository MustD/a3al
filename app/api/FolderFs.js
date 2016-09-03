/**
 * Created by md on 03.09.16.
 */
import fs from 'fs';
export default class FolderFs {

  constructor(path) {
    this.path = path;
  }

  getContent() {
    return fs.readdirSync(this.path);
  }
}
