import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';

import { FilesMemoryPersistence } from './FilesMemoryPersistence';
import { FileV1 } from '../data/version1/FileV1';

export class FilesFilePersistence extends FilesMemoryPersistence {
	protected _persister: JsonFilePersister<FileV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<FileV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}