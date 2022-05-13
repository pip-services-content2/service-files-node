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
exports.FilesCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_9 = require("pip-services3-commons-nodex");
const FileV1Schema_1 = require("../data/version1/FileV1Schema");
class FilesCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        this.addCommand(this.makeGetGroupsCommand());
        this.addCommand(this.makeGetFilesByFilterCommand());
        this.addCommand(this.makeGetFilesByIdsCommand());
        this.addCommand(this.makeGetFileByIdCommand());
        this.addCommand(this.makeCreateFileCommand());
        this.addCommand(this.makeUpdateFileCommand());
        this.addCommand(this.makeDeleteFileByIdCommand());
    }
    makeGetGroupsCommand() {
        return new pip_services3_commons_nodex_2.Command("get_groups", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('paging', new pip_services3_commons_nodex_9.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getGroups(correlationId, paging);
        }));
    }
    makeGetFilesByFilterCommand() {
        return new pip_services3_commons_nodex_2.Command("get_files_by_filter", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty("filter", new pip_services3_commons_nodex_8.FilterParamsSchema())
            .withOptionalProperty("paging", new pip_services3_commons_nodex_9.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getFilesByFilter(correlationId, filter, paging);
        }));
    }
    makeGetFilesByIdsCommand() {
        return new pip_services3_commons_nodex_2.Command("get_files_by_ids", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty("file_ids", new pip_services3_commons_nodex_6.ArraySchema(pip_services3_commons_nodex_7.TypeCode.String)), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let fileIds = args.get("file_id");
            return yield this._logic.getFilesByIds(correlationId, fileIds);
        }));
    }
    makeGetFileByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("get_file_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty("file_id", pip_services3_commons_nodex_7.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let fileId = args.getAsNullableString("file_id");
            return yield this._logic.getFileById(correlationId, fileId);
        }));
    }
    makeCreateFileCommand() {
        return new pip_services3_commons_nodex_2.Command("create_file", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty("file", new FileV1Schema_1.FileV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let file = args.get("file");
            return yield this._logic.createFile(correlationId, file);
        }));
    }
    makeUpdateFileCommand() {
        return new pip_services3_commons_nodex_2.Command("update_file", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty("file", new FileV1Schema_1.FileV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let file = args.get("file");
            return yield this._logic.updateFile(correlationId, file);
        }));
    }
    makeDeleteFileByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_file_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty("file_id", pip_services3_commons_nodex_7.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let fileId = args.getAsNullableString("file_id");
            return yield this._logic.deleteFileById(correlationId, fileId);
        }));
    }
}
exports.FilesCommandSet = FilesCommandSet;
//# sourceMappingURL=FilesCommandSet.js.map