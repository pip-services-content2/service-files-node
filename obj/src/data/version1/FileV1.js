"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
class FileV1 {
    constructor(id, group, name, description, content_id, content_uri, expire_time, attributes) {
        this.id = id;
        this.group = group;
        this.name = name;
        this.description = description;
        this.content_id = content_id;
        this.content_uri = content_uri;
        this.create_time = new Date();
        this.expire_time = expire_time;
        this.attributes = attributes || new pip_services3_commons_nodex_1.StringValueMap();
    }
}
exports.FileV1 = FileV1;
//# sourceMappingURL=FileV1.js.map