import { DataPage } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { FileV1 } from '../data/version1/FileV1';
export interface IFilesController {
    getGroups(correlationId: string, paging: PagingParams): Promise<DataPage<string>>;
    getFilesByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<FileV1>>;
    getFilesByIds(correlationId: string, fileIds: string[]): Promise<FileV1[]>;
    getFileById(correlationId: string, fileId: string): Promise<FileV1>;
    createFile(correlationId: string, file: FileV1): Promise<FileV1>;
    updateFile(correlationId: string, file: FileV1): Promise<FileV1>;
    deleteFileById(correlationId: string, fileId: string): Promise<FileV1>;
}
