import { ITask } from '~shared/_ifaces/ITask';
import { IDataList } from '~shared/_ifaces/content/IDataList';
import { 
	EMethod, 
	IResponseHandler 
} from '~server/httpService';
import { dbManager } from '~server/db/DBManager';

const Tasks: IResponseHandler<IDataList<ITask>> = async () => {
	const taskDAO = dbManager.getTasksDAO();
	const items: ITask[] = await taskDAO.getTasks();
	
	return {
		items
	};  
};

Tasks.method = EMethod.GET;

export { Tasks };