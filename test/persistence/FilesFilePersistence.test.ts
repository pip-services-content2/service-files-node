import { FilesFilePersistence } from '../../src/persistence/FilesFilePersistence';
import { FilesPersistenceFixture } from './FilesPersistenceFixture';

suite('FilesFilePersistence', ()=> {
    let persistence: FilesFilePersistence;
    let fixture: FilesPersistenceFixture;
    
    setup(async () => {
        persistence = new FilesFilePersistence('./data/files.test.json');

        fixture = new FilesPersistenceFixture(persistence);
        
        await persistence.open(null);
        await persistence.clear(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });
});