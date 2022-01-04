export = FreeCompany;
declare class FreeCompany extends Lib {
    search(name: any, params?: {}): Promise<any>;
    get(id: any, params?: {}): Promise<any>;
}
import Lib = require("./Lib");
