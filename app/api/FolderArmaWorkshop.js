/**
 * FolderArmaWorkshop
 */

import { steamAbsolutePath, workshopRelativePath, workshopRelativeFromArmaPath } from '../constants';
import Folder from './Folder';

export default class FolderArmaWorkshop extends Folder {

  constructor() {
    super(steamAbsolutePath + workshopRelativePath);
  }

  setPathFromArma(armaPath) {
    super.setPath(armaPath + workshopRelativeFromArmaPath);
  }
}
