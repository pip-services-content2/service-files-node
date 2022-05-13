"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.FilesLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const FilesServiceFactory_1 = require("../build/FilesServiceFactory");
class FilesLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("files", "File management function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-files', 'controller', 'default', '*', '*'));
        this._factories.add(new FilesServiceFactory_1.FilesServiceFactory());
    }
}
exports.FilesLambdaFunction = FilesLambdaFunction;
exports.handler = new FilesLambdaFunction().getHandler();
//# sourceMappingURL=FilesLambdaFunction.js.map