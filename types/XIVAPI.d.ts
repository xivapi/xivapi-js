export = XIVAPI;
declare module '@xivapi__js'
declare class XIVAPI {
    constructor(options?: {}, legacyOptions?: {});
    endpoint: string;
    globalParams: {};
    verbose: any;
    resources: {
        languages: string[];
    };
    utils: {
        req(path: any, params?: {}): any;
        reqJSON(path: any, body: any): any;
        makeCSV(x: any): string;
        throwError(method: any, param: any): Error;
    };
    search: any;
    data: Data;
    character: Character;
    freecompany: FreeCompany;
    linkshell: Linkshell;
    pvpteam: PvPTeam;
}
import Data = require("./lib/data");
import Character = require("./lib/character");
import FreeCompany = require("./lib/freecompany");
import Linkshell = require("./lib/linkshell");
import PvPTeam = require("./lib/pvpteam");
