/**
 * FolderArmaRoot
 */
import { steamAbsolutePath, armaDefaultRootRelativePath } from '../constants';
import Folder from './Folder';

export default class FolderArmaRoot extends Folder {

  constructor() {
    super(steamAbsolutePath + armaDefaultRootRelativePath);
  }

}
