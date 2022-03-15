import { IPage } from '~page/_ifaces/IPage';
import { ITask } from '~shared/_ifaces/ITask';
import { EProvider } from '~shared/_enums/EProvider';

export interface IState {
	page: IPage;
	tasks: ITask[];
	provider: EProvider;
}
