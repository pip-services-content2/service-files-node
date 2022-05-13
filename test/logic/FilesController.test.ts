const assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { FileV1 } from '../../src/data/version1/FileV1';
import { FilesMemoryPersistence } from '../../src/persistence/FilesMemoryPersistence';
import { FilesController } from '../../src/logic/FilesController';

suite('FilesController', ()=> {
    let persistence: FilesMemoryPersistence;
    let controller: FilesController;

    suiteSetup(async () => {
        persistence = new FilesMemoryPersistence();
        controller = new FilesController();

        let logger = new ConsoleLogger();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('service-files', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-files', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);
        await persistence.open(null);
    });
        
    setup(async () => {
        await persistence.clear(null);
    });
    
    test('CRUD Operations', async () => {
        let file1: FileV1;

        // Create file
        let file = new FileV1(
            null, 'test', 'file-1.dat', 'Test file', '1'
        );

        file = await controller.createFile(null, file);

        assert.isObject(file);
        file1 = file;

        // Update file
        file1.name = 'new_name.dat';

        file = await controller.updateFile(null, file1);

        assert.equal(file.name, 'new_name.dat');

        // Get files
        let page = await controller.getFilesByFilter(null, null, null);

        assert.lengthOf(page.data, 1);


        let groupsPage = await controller.getGroups(null, null);

        assert.lengthOf(page.data, 1);
        
        // Delete file
        await controller.deleteFileById(null, file1.id);

        // Try to get deleted file
        file = await controller.getFileById(null, file1.id);

        assert.isNull(file);
    });
});