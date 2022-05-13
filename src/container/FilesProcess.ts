import { ProcessContainer } from 'pip-services3-container-nodex';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

import { FilesServiceFactory } from '../build/FilesServiceFactory';

export class FilesProcess extends ProcessContainer {

    public constructor() {
        super("files", "File management microservice");
        this._factories.add(new FilesServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
    }

}
