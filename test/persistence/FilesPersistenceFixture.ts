const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { FileV1 } from '../../src/data/version1/FileV1';
import { IFilesPersistence } from '../../src/persistence/IFilesPersistence';

let FILE1 = new FileV1(null, 'test', 'files_image1.jpg', null, '111');
let FILE2 = new FileV1(null, 'test', 'files_image2.jpg', null, '222');

export class FilesPersistenceFixture {
    private _persistence: IFilesPersistence;
    
    constructor(persistence: IFilesPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public async testCrudOperations() {
        let file1, file2;

        // Upload one file
        let file = await this._persistence.create(null, FILE1);

        assert.isObject(file);
        file1 = file;

        assert.equal(file.name, FILE1.name);
        assert.equal(file.group, FILE1.group);
        assert.equal(file.content_id, FILE1.content_id);

        // Upload another file
        file = await this._persistence.create(null, FILE2);

        assert.isObject(file);
        file2 = file;

        assert.equal(file.name, FILE2.name);
        assert.equal(file.group, FILE2.group);
        assert.equal(file.content_id, FILE2.content_id);

        // Get all files
        let files = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                group: 'test'
            }),
            new PagingParams()
        );

        assert.isObject(files);
        assert.lengthOf(files.data, 2);

        // Get all groups
        let groups = await this._persistence.getGroups(null, new PagingParams());

        assert.isObject(groups);
        assert.lengthOf(groups.data, 1);

        file = await this._persistence.getOneById(null, file1.id);

        assert.isObject(file);
        assert.equal(file.id, file1.id);

        // Update the file
        file1.name = "file1.xxx";

        file = await this._persistence.update(null, file1);

        assert.isObject(file);
        file1 = file;

        assert.equal(file.id, file1.id);
        assert.equal(file.name, 'file1.xxx');

        // Delete the file
        await this._persistence.deleteById(null, file1.id);

        // Delete all files
        await this._persistence.deleteById(null, file1.id);

        // Try to get deleted file
        file = await this._persistence.getOneById(null, file1.id);

        assert.isNull(file || null);
    }

}
