import { FilesMemoryPersistence } from '../../src/persistence/FilesMemoryPersistence';
import { FilesPersistenceFixture } from './FilesPersistenceFixture';

suite('FilesMemoryPersistence', ()=> {
    let persistence: FilesMemoryPersistence;
    let fixture: FilesPersistenceFixture;
    
    setup(async () => {
        persistence = new FilesMemoryPersistence();
        fixture = new FilesPersistenceFixture(persistence);
        
        await persistence.open(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

});