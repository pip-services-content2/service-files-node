import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';
import { FileV1 } from '../data/version1/FileV1';
import { IFilesPersistence } from './IFilesPersistence';
export declare class FilesMongoDbPersistence extends IdentifiableMongoDbPersistence<FileV1, string> implements IFilesPersistence {
    constructor();
    getGroups(correlationId: string, paging: PagingParams): Promise<DataPage<string>>;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<FileV1>>;
}
