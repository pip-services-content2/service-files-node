import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { ArraySchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { IFilesController} from './IFilesController';
import { FileV1Schema } from '../data/version1/FileV1Schema';

export class FilesCommandSet extends CommandSet {
    private _logic: IFilesController;

    constructor(logic: IFilesController) {
        super();

        this._logic = logic;

		this.addCommand(this.makeGetGroupsCommand());
		this.addCommand(this.makeGetFilesByFilterCommand());
		this.addCommand(this.makeGetFilesByIdsCommand());
		this.addCommand(this.makeGetFileByIdCommand());
		this.addCommand(this.makeCreateFileCommand());
		this.addCommand(this.makeUpdateFileCommand());
		this.addCommand(this.makeDeleteFileByIdCommand());
    }

	private makeGetGroupsCommand(): ICommand {
		return new Command(
			"get_groups",
			new ObjectSchema(true)
				.withOptionalProperty('paging', new PagingParamsSchema()),
			async (correlationId: string, args: Parameters) => {
				let paging = PagingParams.fromValue(args.get("paging"));
				return await this._logic.getGroups(correlationId, paging);
			}
		);
	}

	private makeGetFilesByFilterCommand(): ICommand {
		return new Command(
			"get_files_by_filter",
			new ObjectSchema(true)
				.withOptionalProperty("filter", new FilterParamsSchema())
				.withOptionalProperty("paging", new PagingParamsSchema())
			,
            async (correlationId: string, args: Parameters) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
				return await this._logic.getFilesByFilter(correlationId, filter, paging);
            }
		);
	}

	private makeGetFilesByIdsCommand(): ICommand {
		return new Command(
			"get_files_by_ids",
			new ObjectSchema(true)
				.withRequiredProperty("file_ids", new ArraySchema(TypeCode.String)),
            async (correlationId: string, args: Parameters) => {
                let fileIds = args.get("file_id");
				return await this._logic.getFilesByIds(correlationId, fileIds);
            }
		);
	}

	private makeGetFileByIdCommand(): ICommand {
		return new Command(
			"get_file_by_id",
			new ObjectSchema(true)
				.withRequiredProperty("file_id", TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let fileId = args.getAsNullableString("file_id");
				return await this._logic.getFileById(correlationId, fileId);
            }
		);
	}

	private makeCreateFileCommand(): ICommand {
		return new Command(
			"create_file",
			new ObjectSchema(true)
				.withRequiredProperty("file", new FileV1Schema()),
            async (correlationId: string, args: Parameters) => {
                let file = args.get("file");
				return await this._logic.createFile(correlationId, file);
            }
		);
	}

	private makeUpdateFileCommand(): ICommand {
		return new Command(
			"update_file",
			new ObjectSchema(true)
				.withRequiredProperty("file", new FileV1Schema()),
            async (correlationId: string, args: Parameters) => {
                let file = args.get("file");
				return await this._logic.updateFile(correlationId, file);
            }
		);
	}

	private makeDeleteFileByIdCommand(): ICommand {
		return new Command(
			"delete_file_by_id",
			new ObjectSchema(true)
				.withRequiredProperty("file_id", TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let fileId = args.getAsNullableString("file_id");
				return await this._logic.deleteFileById(correlationId, fileId);
			}
		);
	}

}