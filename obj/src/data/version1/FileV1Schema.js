"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class FileV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        /* Identification */
        this.withOptionalProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('group', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('name', pip_services3_commons_nodex_2.TypeCode.String);
        /* Content */
        this.withOptionalProperty('description', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('content_id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('content_uri', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('thumbnail_id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('thumbnail_uri', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('create_time', pip_services3_commons_nodex_2.TypeCode.DateTime); //TypeCode.DateTime);
        this.withOptionalProperty('expire_time', pip_services3_commons_nodex_2.TypeCode.DateTime); //TypeCode.DateTime);
        this.withOptionalProperty('attributes', pip_services3_commons_nodex_2.TypeCode.Map);
        /* Custom fields */
        this.withOptionalProperty('custom_hdr', null);
        this.withOptionalProperty('custom_dat', null);
    }
}
exports.FileV1Schema = FileV1Schema;
//# sourceMappingURL=FileV1Schema.js.map