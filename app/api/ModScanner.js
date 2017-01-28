/**
 * ModScanner
 * Created at 28.01.17
 */

import fs from 'fs';
import path from 'path';
import { armaRootStandardFolders } from '../constants';
import { fromJS } from 'immutable';

/*
const
  strArmaDir = process.argv[2]; // "${HOME}/.local/share/Steam/SteamApps/common/Arma 3";
const
  strWsDir = process.argv[3]; // "${HOME}/.local/share/Steam/SteamApps/workshop/content/107410";

megaScan(strArmaDir, strWsDir);
*/

export default class ModScanner {

  /**
   * File parser to extract mod name
   * @param {string} flnm filename to read and search name = ... line in it
   * @param {string} encoding name string (or null if not found or in case of error)
   * @return {string} mod name
   */
  static parseFileForName(flnm, encoding = "utf8") {
    const nmRegEx = /^\s*name\s*=\s*\"(.+)\"\s*;\s*$/m;
    const unesc = /\\(.)/g;
    try {
      const fileContents = fs.readFileSync(flnm, encoding);
      const nmMatches = fileContents.match(nmRegEx);
      if (nmMatches && nmMatches.length > 1) {
        return nmMatches[1].replace(unesc, "$1");
      }
    } catch (e) {
    }
    return null;
  }

  /**
   * Dir access check
   * @param {string} drnm directory path to check
   * @param {int} mode see access mode of fs.accessSync
   * @param {bool} deref dereference symlinks
   * @return {boolean}
   * !side effect: symlinks dereferenced
   */
  static checkDirAccessible(drnm, mode = fs.constants.R_OK | fs.constants.X_OK, deref = true) {
    try {
      var subStat;
      if (deref) {
        subStat = fs.statSync(drnm);
      } else {
        subStat = fs.lstatSync(drnm);
      }
      if (subStat.isDirectory()) {
        fs.accessSync(drnm, mode);
        return true;
      }
    } catch (e) {
    }
    return false;
  }

  static normalizeLinkName(lnkName) {
    let replLink = /[\s():]+/g;
    let linkName = lnkName.replace(replLink, "_");
    replLink = /_+$/g;
    linkName = linkName.replace(replLink, "");
    if (linkName[0] != '@') {
      linkName = "@" + linkName;
    }
    return linkName;
  }


  static isAllNumbers(str) {
    return str.search(/^[0-9]+$/) != -1;
  }

  /**
   * Mods scanner
   * @param {string} scanPath path to scan for mods
   * @param {Array} ignore array of names to ignore
   * @return {Map} string to array: "real location" to  array: ["directory entry, relative path", "", "real location", "mod name if any", "meta name if any", "suggested symlink name"]
   */
  static scanForMods(scanPath, ignore = []) {
    const mapMods = fromJS({}).asMutable();
    var arrEntries = fs.readdirSync(scanPath);
    var i = 0;
    for (; i < arrEntries.length; ++i) {
      var dirEntry = arrEntries[i];
      if (-1 != ignore.indexOf(dirEntry))
        continue;
      var linkName = dirEntry;
      var realBaseName = dirEntry;
      var realLoc = scanPath + path.sep + dirEntry;
      var entryStat = fs.lstatSync(realLoc);
      if (entryStat.isSymbolicLink()) {
        realLoc = fs.realpathSync(realLoc);
        entryStat = fs.statSync(realLoc);
        realBaseName = realLoc.split(/[\\/]/).pop();
      }
      if (entryStat.isDirectory()) {
        var modEntry = fromJS([]).asMutable();
        var isMod = false;
        // check if it's a mod
        var modName = this.parseFileForName(realLoc + path.sep + "mod.cpp");
        var metaName = this.parseFileForName(realLoc + path.sep + "meta.cpp");
        if (!modName && !metaName) {
          // last try: check for addons directory
          if (this.checkDirAccessible(realLoc + path.sep + "addons") || this.checkDirAccessible(realLoc + path.sep + "Addons")) {
            isMod = true;
            modName = metaName = ""; //dirEntry;
            if (this.isAllNumbers(dirEntry) && !this.isAllNumbers(realBaseName)) {
              linkName = realBaseName;
            }
          } else {
            console.log("Failed entry: " + dirEntry + ": no .cpp files, no addons directory");
          }
        } else {
          isMod = true;
          if (!!modName && !!metaName) {
            if (modName.length < metaName.length) {
              linkName = modName;
            } else {
              linkName = metaName;
            }
          } else {
            if (!metaName) {
              metaName = "";
              linkName = modName;
            }
            if (!modName) {
              modName = "";
              linkName = metaName;
            }
          }
        }
        if (isMod) {
          linkName = this.normalizeLinkName(linkName);

          modEntry.push(dirEntry);
          modEntry.push(realLoc);
          modEntry.push(modName);
          modEntry.push(metaName);
          modEntry.push(linkName);

          mapMods.set(realLoc, fromJS(modEntry));
        }
      }
    }

    return mapMods;
  }

  /**
   * mods scanner
   * @param {string} armaDir directory where arma installed
   * @param {string} workshopDir workshop content directory
   * @return {Array} of strings: use them as arma's -mod= args
   */
  static megaScan(armaDir, workshopDir) {
    const armaMods = this.scanForMods(armaDir, armaRootStandardFolders);
    const workshopMods = this.scanForMods(workshopDir, []);
    let modNames = [];
    console.log(armaMods);
    for (let relPath of armaMods) {
      modNames.push(armaMods.getIn([relPath, 0]));
    }

    for (let realPath of workshopMods) {
      console.log("Processing WS mod: " + realPath);
      if (armaMods.has(realPath)) {
        console.log(`Not creating link: Mod already present: ${armaMods.getIn([realPath, 0])}; effectively ${armaMods[realPath][1]}`);
      } else {
        // first check if name is taken
        if (fs.existsSync(armaDir + path.sep + workshopMods.getIn([realPath, 4]))) {
          console.log(`Not creating link '${realPath} -> ${workshopMods.getIn([realPath, 4])}': link name exists`);
        } else {
          console.log(`Creating symlink: ${armaDir}${path.sep}${workshopMods.getIn([realPath, 4])} -> ${workshopDir}${path.sep}${workshopMods.getIn([realPath, 0])}`);
          try {
            fs.symlinkSync(workshopDir + path.sep + workshopMods.getIn([realPath, 0]), armaDir + path.sep + workshopMods.getIn([realPath, 4]), "dir");
            console.log(`Created symlink: ${armaDir}${path.sep}${workshopMods.getIn([realPath, 4])} -> ${workshopDir}${path.sep}${workshopMods.getIn([realPath, 0])}`);
            modNames.push(workshopMods.getIn([realPath, 4]));
          } catch (e) {}
        }
      }
    }
    console.log(workshopMods);
    return modNames;
  }

}
