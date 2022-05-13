import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';

import { FileV1 } from '../data/version1/FileV1';
import { IFilesPersistence } from './IFilesPersistence';

export class FilesMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<FileV1, string> 
    implements IFilesPersistence {

    constructor() {
        super('files');
    }

    public async getGroups(correlationId: string, paging: PagingParams): Promise<DataPage<string>> {
        
        // Extract a page
        paging = paging != null ? paging : new PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);
        let total = null;

        let filter = { };
        let options = { group: 1 };
        
        let items = await this._collection.find(filter, options).toArray();

        if (items != null) {
            items = items.map((item) => item.group);
            items = [...new Set(items)].sort();

            if (paging.total)
                total = items.length;

            if (skip > 0)
                items = items.slice(skip);
            items = items.slice(0, take);
        }

        let page = new DataPage<string>(items, total);
        return page;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let criteria = [];

        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ name: { $regex: searchRegex } });
            searchCriteria.push({ description: { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        let name = filter.getAsNullableString('name');
        if (name != null)
            criteria.push({ name: name });

        let group = filter.getAsNullableString('group');
        if (group != null)
            criteria.push({ group: group });

        let type = filter.getAsNullableString('type');
        if (type != null)
            criteria.push({ type: type });

        let expired = filter.getAsNullableBoolean('expired');
        if (expired != null) {
            let now = new Date();
            if (expired)
                criteria.push({ expire_time: { $lte: now } });
            else
                criteria.push({ expire_time: { $gt: now } });
        }

        let fromCreateTime = filter.getAsNullableDateTime('from_create_time');
        if (fromCreateTime != null)
            criteria.push({ create_time: { $gte: fromCreateTime } });

        let toCreateTime = filter.getAsNullableDateTime('to_create_time');
        if (toCreateTime != null)
            criteria.push({ create_time: { $lt: toCreateTime } });

        return criteria.length > 0 ? { $and: criteria } : {};
    }

    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<FileV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, '-create_time', { custom_dat: 0 });
    }

}
