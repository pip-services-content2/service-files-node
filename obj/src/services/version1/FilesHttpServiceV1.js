"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class FilesHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/files');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-files', 'controller', 'default', '*', '1.0'));
    }
}
exports.FilesHttpServiceV1 = FilesHttpServiceV1;
//# sourceMappingURL=FilesHttpServiceV1.js.map