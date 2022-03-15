import { IShow } from '~shared/_ifaces/IShow';
import { EStatus } from '~shared/_enums/EStatus';

export interface IShowRow extends IShow {
	className?: string;
	isActive?: boolean,
	secondaryTitle?: string,
	progress?: number;
	status?: EStatus;
	episode?: number;
	onClick?: Function,
	onActionClick?: Function,
}