import { ITask } from '~shared/_ifaces/ITask';
import { IDataList } from '~shared/_ifaces/content/IDataList';
import { EMethod } from '~server/httpService/_enums/EMethod';
import { dbManager } from '~server/db/DBManager';
import { IResponseHandler } from '~server/httpService';

const Progress: IResponseHandler<IDataList<ITask>> = async () => {
	const taskDAO = dbManager.getTasksDAO();
	return {
		items: await taskDAO.getDownloads(),
		scrollPageNumber: 0,
	};
};

Progress.method = EMethod.GET;

export { Progress };