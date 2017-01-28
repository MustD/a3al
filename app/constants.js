/**
 * constants
 */

import os  from 'os';

export const armaRootStandardFolders =
  [
    "Addons",
    "BattlEye",
    "Bonus",
    "Curator",
    "Dta",
    "Expansion",
    "Heli",
    "Kart",
    "Keys",
    "MPMissions",
    "Mark",
    "Missions",
    "legal"
  ];

export const steamAbsolutePath = os.homedir() + '/.local/share/Steam/';
export const armaDefaultRootRelativePath = 'steamapps/common/Arma 3/';
export const workshopRelativePath = 'steamapps/workshop/content/107410/';
export const workshopRelativeFromArmaPath = '../../workshop/content/107410';
