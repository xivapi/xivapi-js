export = Content;
declare class Content extends Lib {
    content(): Promise<any>;
    list(name: any, params?: {}): Promise<any>;
    get(name: any, id: any): Promise<any>;
    servers(): any;
    datacenters(): any;
}
import Lib = require("./Lib");
