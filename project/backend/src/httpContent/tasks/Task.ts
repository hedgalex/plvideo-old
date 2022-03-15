import { ITask } from '~shared/_ifaces/ITask';
import { IDataItem } from '~shared/_ifaces/content/IDataItem';
import { EProvider } from '~shared/_enums/EProvider';
import { ProviderManager } from '~server/providers/ProviderManager';
import {
	EMethod,
	TParams,
	BadRequestException,
	IResponseHandler,
	IRequestProps,
} from '~server/httpService';
import { dbManager } from '~server/db/DBManager';

interface ITaskParams extends TParams {
	service?: EProvider;
	name?: string;
}

const Task: IResponseHandler<IDataItem<ITask>> = async (props: IRequestProps) => {
	const {
		params = {} as ITaskParams,
	} = props;
	
	const {
		name = '',
		service: serviceName = EProvider.ORORO,
	} = params;

	const taskDAO = dbManager.getTasksDAO();
	const task = await taskDAO.getTaskByName(name);
	
	if (task) {
		throw new BadRequestException(`The show is already added ${name}`);
	}

	const provider = ProviderManager.getProvider(serviceName);
	const downloadInfo = await provider.getDownloadInfo(name);
	const resultTask: ITask = await taskDAO.addTask(downloadInfo);

	return { item: resultTask };
};

Task.method = EMethod.PUT;

export { Task };