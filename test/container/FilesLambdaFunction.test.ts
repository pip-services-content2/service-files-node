const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';

import { FileV1 } from '../../src/data/version1/FileV1';
import { FilesLambdaFunction } from '../../src/container/FilesLambdaFunction';

suite('FilesLambdaFunction', ()=> {
    let lambda: FilesLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-files:persistence:memory:default:1.0',
            'controller.descriptor', 'service-files:controller:default:default:1.0'
        );

        lambda = new FilesLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('CRUD Operations', async () => {
        let file1: FileV1;

        // Start writing file
        let file = new FileV1(
            null, 'test', 'file-1.dat', 'Test file', '111'
        );

        file1 = await lambda.act(
            {
                role: 'files',
                cmd: 'create_file',
                file: file
            }
        );

        file1.name = 'new_file.dat';
        file1 = await lambda.act(
            {
                role: 'files',
                cmd: 'update_file',
                file: file1
            }
        );

        assert.equal(file1.name, 'new_file.dat');

        // Get files
        let page = await lambda.act(
            {
                role: 'files',
                cmd: 'get_files_by_filter'
            }
        );

        assert.lengthOf(page.data, 1);

        // Delete file
        await lambda.act(
            {
                role: 'files',
                cmd: 'delete_file_by_id',
                file_id: file1.id
            }
        );

        // Try to get deleted file
        file = await lambda.act(
            {
                role: 'files',
                cmd: 'get_file_by_id',
                file_id: file1.id
            }
        );
    });
});