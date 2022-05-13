"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const FilesMongoDbPersistence_1 = require("../persistence/FilesMongoDbPersistence");
const FilesFilePersistence_1 = require("../persistence/FilesFilePersistence");
const FilesMemoryPersistence_1 = require("../persistence/FilesMemoryPersistence");
const FilesController_1 = require("../logic/FilesController");
const FilesHttpServiceV1_1 = require("../services/version1/FilesHttpServiceV1");
class FilesServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(FilesServiceFactory.MemoryPersistenceDescriptor, FilesMemoryPersistence_1.FilesMemoryPersistence);
        this.registerAsType(FilesServiceFactory.FilePersistenceDescriptor, FilesFilePersistence_1.FilesFilePersistence);
        this.registerAsType(FilesServiceFactory.MongoDbPersistenceDescriptor, FilesMongoDbPersistence_1.FilesMongoDbPersistence);
        this.registerAsType(FilesServiceFactory.ControllerDescriptor, FilesController_1.FilesController);
        this.registerAsType(FilesServiceFactory.HttpServiceDescriptor, FilesHttpServiceV1_1.FilesHttpServiceV1);
    }
}
exports.FilesServiceFactory = FilesServiceFactory;
FilesServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-files", "factory", "default", "default", "1.0");
FilesServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-files", "persistence", "memory", "*", "1.0");
FilesServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-files", "persistence", "file", "*", "1.0");
FilesServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-files", "persistence", "mongodb", "*", "1.0");
FilesServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-files", "controller", "default", "*", "1.0");
FilesServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-files", "service", "http", "*", "1.0");
//# sourceMappingURL=FilesServiceFactory.js.map