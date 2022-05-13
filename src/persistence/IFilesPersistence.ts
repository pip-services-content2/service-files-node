import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';
import { IWriter } from 'pip-services3-data-nodex';

import { FileV1 } from '../data/version1/FileV1';

export interface IFilesPersistence extends IGetter<FileV1, string>, IWriter<FileV1, string> {
    getGroups(correlationId: string, paging: PagingParams): Promise<DataPage<string>>;

    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<FileV1>>;

    getListByIds(correlationId: string, ids: string[]): Promise<FileV1[]>;

    getOneById(correlationId: string, id: string): Promise<FileV1>;

    create(correlationId: string, item: FileV1): Promise<FileV1>;

    update(correlationId: string, item: FileV1): Promise<FileV1>;

    deleteById(correlationId: string, id: string): Promise<FileV1>;
}
