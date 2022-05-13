import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { FilesServiceFactory } from '../build/FilesServiceFactory';

export class FilesLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("files", "File management function");
        this._dependencyResolver.put('controller', new Descriptor('service-files', 'controller', 'default', '*', '*'));
        this._factories.add(new FilesServiceFactory());
    }
}

export const handler = new FilesLambdaFunction().getHandler();