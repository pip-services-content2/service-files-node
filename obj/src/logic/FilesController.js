"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const FilesCommandSet_1 = require("./FilesCommandSet");
class FilesController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(FilesController._defaultConfig);
        this._facetsGroup = 'files';
    }
    configure(config) {
        this._dependencyResolver.configure(config);
        this._facetsGroup = config.getAsStringWithDefault('options.facets_group', this._facetsGroup);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
        this._blobsClient = this._dependencyResolver.getOneOptional('blobs');
        this._facetsClient = this._dependencyResolver.getOneOptional('facets');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new FilesCommandSet_1.FilesCommandSet(this);
        return this._commandSet;
    }
    getGroups(correlationId, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            // When facets client is defined then use it to retrieve groups
            if (this._facetsClient != null) {
                let page = yield this._facetsClient.getFacetsByGroup(correlationId, this._facetsGroup, paging);
                if (page != null) {
                    let data = page.data.map((facet) => facet.group);
                    let result = new pip_services3_commons_nodex_3.DataPage(data, page.total);
                    return result;
                }
            }
            // Otherwise retrieve groups directly. But that is going to be VERY slow. Don't use it in production!
            else {
                return yield this._persistence.getGroups(correlationId, paging);
            }
        });
    }
    getFilesByFilter(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getPageByFilter(correlationId, filter, paging);
        });
    }
    getFilesByIds(correlationId, fileIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getListByIds(correlationId, fileIds);
        });
    }
    getFileById(correlationId, fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getOneById(correlationId, fileId);
        });
    }
    normalizeName(name) {
        if (name == null)
            return null;
        name = name.replace('\\', '/');
        let pos = name.lastIndexOf('/');
        if (pos >= 0)
            name = name.substring(pos + 1);
        return name;
    }
    createFile(correlationId, file) {
        return __awaiter(this, void 0, void 0, function* () {
            let newFile;
            file.id = file.id || pip_services3_commons_nodex_4.IdGenerator.nextLong();
            file.name = this.normalizeName(file.name);
            file.create_time = new Date();
            // Create file
            newFile = yield this._persistence.create(correlationId, file);
            // Add group to facet search
            if (this._facetsClient != null && file.group != null)
                this._facetsClient.addFacet(correlationId, this._facetsGroup, file.group);
            return newFile;
        });
    }
    updateFile(correlationId, file) {
        return __awaiter(this, void 0, void 0, function* () {
            let newFile;
            file.name = this.normalizeName(file.name);
            // Update file
            newFile = yield this._persistence.update(correlationId, file);
            // Remove old group from facet search
            if (this._facetsClient != null && file.group != null && file.group != newFile.group)
                yield this._facetsClient.removeFacet(correlationId, this._facetsGroup, file.group);
            // Add new group from facet search
            if (this._facetsClient != null && newFile.group != null && file.group != newFile.group)
                yield this._facetsClient.addFacet(correlationId, this._facetsGroup, newFile.group);
            return newFile;
        });
    }
    deleteFileById(correlationId, fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            let file;
            // Delete file
            file = yield this._persistence.deleteById(correlationId, fileId);
            // Delete content blob
            if (file != null && file.content_id != null && this._blobsClient != null)
                yield this._blobsClient.deleteBlobById(correlationId, file.content_id);
            // Delete thumbnail blob
            if (file != null && file.thumbnail_id != null && this._blobsClient != null)
                yield this._blobsClient.deleteBlobById(correlationId, file.thumbnail_id);
            // Remove group from facet search
            if (this._facetsClient != null && file.group != null)
                yield this._facetsClient.removeFacet(correlationId, this._facetsGroup, file.group);
            return file;
        });
    }
}
exports.FilesController = FilesController;
FilesController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence', 'service-files:persistence:*:*:1.0', 'dependencies.blobs', 'pip-services-blobs:client:*:*:1.0', 'dependencies.facets', 'client-facets:client:*:*:1.0', 'options.facets_group', 'files');
//# sourceMappingURL=FilesController.js.map