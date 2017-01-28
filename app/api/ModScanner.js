/**
 * ModScanner
 * Created at 28.01.17
 */

import fs from 'fs';
import path from 'path';
import { armaRootStandardFolders } from '../constants';

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
  parseFileForName(flnm, encoding = "utf8") {
    var nmRegEx = /^\s*name\s*=\s*\"(.+)\"\s*;\s*$/m;
    var unesc = /\\(.)/g;
    try {
      var fileContents = fs.readFileSync(flnm, encoding);
      var nmMatches = fileContents.match(nmRegEx);
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
  checkDirAccessible(drnm, mode = fs.constants.R_OK | fs.constants.X_OK, deref = true) {
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

  normalizeLinkName(lnkName) {
    let replLink = /[\s():]+/g;
    let linkName = lnkName.replace(replLink, "_");
    replLink = /_+$/g;
    linkName = linkName.replace(replLink, "");
    if (linkName[0] != '@') {
      linkName = "@" + linkName;
    }
    return linkName;
  }


  isAllNumbers(str) {
    return str.search(/^[0-9]+$/) != -1;
  }

  /**
   * Mods scanner
   * @param {string} scanPath path to scan for mods
   * @param {array} ignore array of names to ignore
   * @return {Map} string to array: "real location" to  array: ["directory entry", "real location", "mod name if any", "meta name if any", "suggested symlink name"]
   */
  scanForMods(scanPath, ignore) {
    var mapMods = new Map();
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
        var modEntry = [];
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

          modEntry.push(scanPath + path.sep + dirEntry);
          modEntry.push(realLoc);
          modEntry.push(modName);
          modEntry.push(metaName);
          modEntry.push(linkName);

          mapMods[realLoc] = modEntry;
        }
      }
    }

    return mapMods;
  }

  /**
   * mods scanner
   * @param {string} armaDir directory where arma installed
   * @param {string} workshopDir workshop content directory
   */
  megaScan(armaDir, workshopDir) {
    const armaMods = this.scanForMods(armaDir, armaRootStandardFolders);
    const workshopMods = this.scanForMods(workshopDir, []);

    for (let realPath of Object.keys(workshopMods)) {
      console.log("Processing WS mod: " + realPath);
      if (armaMods.has(realPath)) {
        console.log("Mod already present: " + armaMods[realPath][0] + " -> " + armaMods[realPath][1]);
      } else {
        // first check if name is taken
        if (fs.existsSync(armaDir + path.sep + workshopMods[realPath][4])) {
          console.log("Not creating link '" + realPath + " -> " + workshopMods[realPath][4] + "': link name exists");
        } else {
          console.log("Creating symlink: " + armaDir + path.sep + workshopMods[realPath][4] + " -> " + realPath);
          //try {
          //	////fs.symlinkSync(workshopMods[realPath][0], armaDir + path.sep + workshopMods[realPath][4], "dir");
          //	fs.symlinkSync(realPath, armaDir + path.sep + workshopMods[realPath][4], "dir");
          //	console.log("Created symlink: " + armaDir + path.sep + workshopMods[realPath][4] + " -> " + realPath)
          //} catch (e) {}
        }
      }
    }
    //console.log(workshopMods);
  }


}
