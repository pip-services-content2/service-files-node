import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class FilesHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/files');
        this._dependencyResolver.put('controller', new Descriptor('service-files', 'controller', 'default', '*', '1.0'));
    }
}