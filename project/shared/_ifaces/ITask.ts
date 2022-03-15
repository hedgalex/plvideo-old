import { EStatus } from '~shared/_enums/EStatus';

export interface ITask {
	id?: number;
	name: string;
	showname: string;
	origin_id?: number;
	title: string;
	season: number;
	episode: number;
	image?: string;
	path: string;
	url: string;
	status?: EStatus;
	status_id?: number;
	progress?: number;
}
