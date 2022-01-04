export = Lib;
declare class Lib {
    constructor(parent: any);
    parent: any;
    req: any;
    reqJSON: any;
    makeCSV: (x: any) => string;
    throwError: (method: any, param: any) => Error;
}
