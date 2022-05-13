"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
const FilesServiceFactory_1 = require("../build/FilesServiceFactory");
class FilesProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("files", "File management microservice");
        this._factories.add(new FilesServiceFactory_1.FilesServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.FilesProcess = FilesProcess;
//# sourceMappingURL=FilesProcess.js.map