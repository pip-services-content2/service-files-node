import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { IdGenerator } from 'pip-services3-commons-nodex';

import { IBlobsClientV1 } from 'client-blobs-node';
import { IFacetsClientV1 } from 'client-facets-node';

import { FileV1 } from '../data/version1/FileV1';
import { IFilesPersistence } from '../persistence/IFilesPersistence';
import { IFilesController} from './IFilesController';
import { FilesCommandSet } from './FilesCommandSet';

export class FilesController implements IConfigurable, IReferenceable, ICommandable, IFilesController{
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-files:persistence:*:*:1.0',
        'dependencies.blobs', 'pip-services-blobs:client:*:*:1.0',
        'dependencies.facets', 'client-facets:client:*:*:1.0',

        'options.facets_group', 'files'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(FilesController._defaultConfig);
    private _persistence: IFilesPersistence;
    private _blobsClient: IBlobsClientV1;
    private _facetsClient: IFacetsClientV1;
    private _commandSet: FilesCommandSet;
    private _facetsGroup: string = 'files';

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
        this._facetsGroup = config.getAsStringWithDefault('options.facets_group', this._facetsGroup);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IFilesPersistence>('persistence');
        this._blobsClient = this._dependencyResolver.getOneOptional<IBlobsClientV1>('blobs');
        this._facetsClient = this._dependencyResolver.getOneOptional<IFacetsClientV1>('facets');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new FilesCommandSet(this);
        return this._commandSet;
    }

    public async getGroups(correlationId: string, paging: PagingParams): Promise<DataPage<string>> {
        // When facets client is defined then use it to retrieve groups
        if (this._facetsClient != null) {
            let page = await this._facetsClient.getFacetsByGroup(correlationId, this._facetsGroup, paging);
            if (page != null) {
                let data = page.data.map((facet) => facet.group);
                let result = new DataPage<string>(data, page.total);
                return result
            }
        } 
        // Otherwise retrieve groups directly. But that is going to be VERY slow. Don't use it in production!
        else {
            return await this._persistence.getGroups(correlationId, paging);
        }
    }

    public async getFilesByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<FileV1>> {
        return await this._persistence.getPageByFilter(correlationId, filter, paging);
    }

    public async getFilesByIds(correlationId: string, fileIds: string[]): Promise<FileV1[]> {
        return await this._persistence.getListByIds(correlationId, fileIds);
    }

    public async getFileById(correlationId: string, fileId: string): Promise<FileV1> {
        return await this._persistence.getOneById(correlationId, fileId);
    }

    private normalizeName(name: string): string {
        if (name == null) return null;

        name = name.replace('\\', '/');
        let pos = name.lastIndexOf('/');
        if (pos >= 0)
            name = name.substring(pos + 1);

        return name;
    }

    public async createFile(correlationId: string, file: FileV1): Promise<FileV1> {
        let newFile: FileV1;

        file.id = file.id || IdGenerator.nextLong();
        file.name = this.normalizeName(file.name);
        file.create_time = new Date();

        // Create file
        newFile = await this._persistence.create(correlationId, file);

        // Add group to facet search
        if (this._facetsClient != null && file.group != null)
            this._facetsClient.addFacet(correlationId, this._facetsGroup, file.group);

        return newFile;
    }

    public async updateFile(correlationId: string, file: FileV1): Promise<FileV1> {
        let newFile: FileV1;

        file.name = this.normalizeName(file.name);

        // Update file
        newFile = await this._persistence.update(correlationId, file);

        // Remove old group from facet search
        if (this._facetsClient != null && file.group != null && file.group != newFile.group)
            await this._facetsClient.removeFacet(correlationId, this._facetsGroup, file.group);

        // Add new group from facet search
        if (this._facetsClient != null && newFile.group != null && file.group != newFile.group)
            await this._facetsClient.addFacet(correlationId, this._facetsGroup, newFile.group);

        return newFile;
    }

    public async deleteFileById(correlationId: string, fileId: string): Promise<FileV1> {
        let file: FileV1;

        // Delete file
        file = await this._persistence.deleteById(correlationId, fileId);

        // Delete content blob
        if (file != null && file.content_id != null && this._blobsClient != null)
            await this._blobsClient.deleteBlobById(correlationId, file.content_id);

        // Delete thumbnail blob
        if (file != null && file.thumbnail_id != null && this._blobsClient != null)
            await this._blobsClient.deleteBlobById(correlationId, file.thumbnail_id);

        // Remove group from facet search
        if (this._facetsClient != null && file.group != null)
            await this._facetsClient.removeFacet(correlationId, this._facetsGroup, file.group);

        return file;
    }
}
