import { IDataItem } from '~shared/_ifaces/content/IDataItem';
import { 
	NotFoundException,
	GoneException,
	EMethod,
	TParams,
	IResponseHandler,
	IRequestProps,
} from '~server/httpService';
import { dbManager } from '~server/db/DBManager';

interface IRemoveTaskParams extends TParams {
	name?: string;
}

const RemoveTask: IResponseHandler<IDataItem<string>> = async (props: IRequestProps) => {
	const {
		params = {} as IRemoveTaskParams,
	} = props;

	const { name } = params;
	if (!name) {
		throw new NotFoundException(`Wrong name ${name}`);
	}
	
	const taskDAO = dbManager.getTasksDAO();
	const deleted = await taskDAO.removeTaskByName(name);
	
	if (!deleted) {
		throw new GoneException(`Could not delete task ${name}`);
	}

	return {
		item: name
	};
};

RemoveTask.method = EMethod.DELETE;

export { RemoveTask };