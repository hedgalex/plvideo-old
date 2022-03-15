import { IShow } from './IShow';

export interface IEpisode extends IShow {
	season: number;
	episode: number;
}