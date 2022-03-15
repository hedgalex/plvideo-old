import { IShow } from './IShow';
import { ISeason } from './ISeason';
import { IEpisode } from './IEpisode';

export interface ITVShow extends IShow {
  year?: number;
  seasons?: ISeason[];
	episodes?: IEpisode[];
}