import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';
import { FilesMemoryPersistence } from './FilesMemoryPersistence';
import { FileV1 } from '../data/version1/FileV1';
export declare class FilesFilePersistence extends FilesMemoryPersistence {
    protected _persister: JsonFilePersister<FileV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
