import { padStart } from 'lodash';

export const pad2 = (num: number): string => padStart(num + '', 2, '0');

export const standartEpisodeNumber = (season: number, episode: number): string =>
	`s${pad2(season)}e${pad2(episode)}`;