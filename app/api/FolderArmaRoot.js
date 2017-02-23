/**
 * FolderArmaRoot
 */
import { steamAbsolutePath, armaDefaultRootRelativePath } from '../constants';
import Folder from './Folder';
import { armaRootStandardFolders } from '../constants';

export default class FolderArmaRoot extends Folder {

  constructor() {
    super(steamAbsolutePath + armaDefaultRootRelativePath);
  }

  checkFolder() {
    let result = super.checkFolder();
    if(result) {
      for (let path of armaRootStandardFolders) {
        let folder = new Folder(`${this.path}/${path}`);
        folder.setLogger(this.logger);
        if (!folder.checkFolder()) {
          result = false;
        }
      }
    }
    // todo: add .exe validation
    return result
  }

}
