import { EStatus } from '~shared/_enums/EStatus';
import { EShowType } from '~shared/_enums/EShowType';

export interface ICardShort {
	id: number;
	name: string;
	title: string;
	image?: string;
	year?: number;
	status?: EStatus,
	type?: EShowType,
	progress?: number;
	className?: string;
	onCardClick?: Function;
	onActionClick?: Function;
}