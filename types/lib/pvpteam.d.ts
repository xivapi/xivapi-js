export = PvPTeam;
declare class PvPTeam extends Lib {
    search(name: any, params?: {}): Promise<any>;
    get(id: any): Promise<any>;
}
import Lib = require("./Lib");
