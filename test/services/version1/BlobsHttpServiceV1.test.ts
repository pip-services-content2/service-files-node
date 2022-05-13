const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { FileV1 } from '../../../src/data/version1/FileV1';
import { FilesMemoryPersistence } from '../../../src/persistence/FilesMemoryPersistence';
import { FilesController } from '../../../src/logic/FilesController';
import { FilesHttpServiceV1 } from '../../../src/services/version1/FilesHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);


suite('FilesHttpServiceV1', ()=> {
    let service: FilesHttpServiceV1;
    let persistence: FilesMemoryPersistence;
    let rest: any;

    suiteSetup(async () => {
        persistence = new FilesMemoryPersistence();
        let controller = new FilesController();

        service = new FilesHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-files', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-files', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-files', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(async () => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });

        await persistence.clear(null);
    });
    
    test('CRUD Operations', async () => {
        let file1: FileV1;

        // Create file
        let file = new FileV1(
            null, 'test', 'file-1.dat', 'Test file', '111'
        );

        file = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/files/create_file',
                {
                    file: file
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(file);
        file1 = file;

        // Update file
        file1.name = 'new_file.dat';

        file = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/files/update_file',
                {
                    file: file1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(file);
        assert.equal(file.name, 'new_file.dat');

        // Get files
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/files/get_files_by_filter',
                {
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.lengthOf(page.data, 1);

        // Delete file
        await new Promise<any>((resolve, reject) => {
            rest.post('/v1/files/delete_file_by_id',
                {
                    file_id: file1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // Try to get deleted file
        file = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/files/get_file_by_id',
                {
                    file_id: file1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // assert.isNull(file);
    });
});