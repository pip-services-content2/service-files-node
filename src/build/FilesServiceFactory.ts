import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { FilesMongoDbPersistence } from '../persistence/FilesMongoDbPersistence';
import { FilesFilePersistence } from '../persistence/FilesFilePersistence';
import { FilesMemoryPersistence } from '../persistence/FilesMemoryPersistence';

import { FilesController } from '../logic/FilesController';
import { FilesHttpServiceV1 } from '../services/version1/FilesHttpServiceV1';

export class FilesServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-files", "factory", "default", "default", "1.0");

	public static MemoryPersistenceDescriptor = new Descriptor("service-files", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("service-files", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("service-files", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("service-files", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("service-files", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(FilesServiceFactory.MemoryPersistenceDescriptor, FilesMemoryPersistence);
		this.registerAsType(FilesServiceFactory.FilePersistenceDescriptor, FilesFilePersistence);
		this.registerAsType(FilesServiceFactory.MongoDbPersistenceDescriptor, FilesMongoDbPersistence);
		this.registerAsType(FilesServiceFactory.ControllerDescriptor, FilesController);
		this.registerAsType(FilesServiceFactory.HttpServiceDescriptor, FilesHttpServiceV1);
	}
	
}
