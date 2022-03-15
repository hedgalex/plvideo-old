import axios from 'axios';
import { 
	filter, 
	find, 
	flatten, 
	map 
} from 'lodash';
import { parse } from 'node-html-parser';
import { EProvider } from '~shared/_enums/EProvider';
import { NotFoundException } from '~server/httpService';
import { ITVShow } from '~shared/_ifaces/ITVShow';
import { IShow } from '~shared/_ifaces/IShow';
import { IMovie } from '~shared/_ifaces/IMovie';
import { EShowType } from '~shared/_enums/EShowType';
import { ISeason } from '~shared/_ifaces/ISeason';
import { IEpisode } from '~shared/_ifaces/IEpisode';
import { 
	pad2, 
	standartEpisodeNumber 
} from '~server/utils';
import { EParamTypes } from '../_enums/EParamTypes';
import { IParams } from '../_ifaces/IParams';
import { IProvider } from '../_ifaces/IProvider';
import { IOroroSearchResult } from './_ifaces/IOroroSearchResult';
import { IConfig } from '~server/config';
import { 
	extractName, 
	generateHeaders
} from './utils';

export class OroroProvider implements IProvider {
  private config: IConfig;
  
  constructor(config: IConfig) {
    this.config = config;
  }

	private searchTVShows = async (pageNumber: number): Promise<ITVShow[]> => {
		const { data } = await axios.get(
			`${this.config.getTVShowsURL(EProvider.ORORO)}${pageNumber}`, {
				headers: generateHeaders(this.config, true),
			});
		
			const items = (data as IOroroSearchResult).items.map(({id, title, url, image, year, desc}) => {
			const name = extractName(url);

			return {
				id,
				title,
				name,
				showname: name,
				image,
				year: parseInt(year),
				description: desc,
				type: EShowType.TVSHOW,
			};
		});

		return items;
	};

	private searchMovies = async (pageNumber: number): Promise<IMovie[]> => {
		const { data } = await axios.get(
			`${this.config.getMoviesURL(EProvider.ORORO)}${pageNumber}`, {
				headers: generateHeaders(this.config, true),
			});

		const items = (data as IOroroSearchResult).items.map(({id, title, url, image, year, desc}) => {
			const name = extractName(url);

			return {
				id,
				title,
				name,
				showname: name,
				image,
				year: parseInt(year),
				description: desc,
				type: EShowType.MOVIE,
			};
		});

		return items;
	};

	private fetchTVShow = async (name: string): Promise<ITVShow> => {
		const { data } = await axios.get(
			`${this.config.getBaseURL(EProvider.ORORO)}/en/shows/${name}`, {
				headers: generateHeaders(this.config, false),
			});
		
		const root = parse(data);

		const id = parseInt(root.querySelector('.media-controls__button').getAttribute('data-id'));
		const year = parseInt(root.querySelector('#year').text?.replace(/[\s\S]*?([\d]{4})[\s\S]*/, '$1'));
		const title = root.querySelector('.show-content__title').text?.replace(/^\s*|\s*$/g, '');
		const description = root.querySelector('.show-content__description').text?.replace(/^\s*|\s*$/g, '');
		const image = root.querySelector('#poster').getAttribute('src');

		const seasonTabs = root.querySelectorAll(`.show-content__episode-list .js-season-tab`);
		const seasons: ISeason[] = [];
			
		const episodes: IEpisode[] = flatten(
			map(seasonTabs, seasonTab => {
				const seasonNumber = parseInt(seasonTab.getAttribute('id'));
				const episodes = seasonTab.querySelectorAll('.show-content__episode-row');
				seasons.push({ id: seasonNumber });

				return map(episodes, episode => {
					const episodeNumber = parseInt(episode.querySelector('.show-content__episode-num').text);
					const episodeLink = episode.querySelector('.show-content__episode-link');
					const id = parseInt(episodeLink.getAttribute('data-id'));
					const title = episodeLink.getAttribute('data-title');
					const episodeName = `${name}_${standartEpisodeNumber(seasonNumber, episodeNumber)}`;

					return {
						id,
						title,
						image,
						showname: name,
						name: episodeName,
						episode: episodeNumber,
						season: seasonNumber,
						description,
						type: EShowType.EPISODE,
					};
				});
			})
		);

		return {
			id,
			name,
			title,
			image,
			year,
			description,
			episodes,
			seasons,
			type: EShowType.TVSHOW,
		};
	}

	private fetchMovie = async (name: string): Promise<IMovie> => {
		const { data } = await axios.get(
			`${this.config.getBaseURL(EProvider.ORORO)}/en/movies/${name}`, {
				headers: generateHeaders(this.config, false),
			});

		const root = parse(data);

		const title = root.querySelector('.show-content__title').text?.replace(/^\s*|\s*$/g, '');
		const description = root.querySelector('.show-content__description').text?.replace(/^\s*|\s*$/g, '');
		const image = root.querySelector('#poster').getAttribute('src');
		const year = parseInt(root.querySelector('#year').text?.replace(/[\s\S]*?([\d]{4})[\s\S]*/, '$1'));

		return {
			id: 0,
			name,
			title,
			description,
			image,
			year,
			type: EShowType.MOVIE
		};
	}

	scan = async ({ page, type }: IParams): Promise<IShow[]> => {
		switch(type) {
			case EParamTypes.MOVIES:
				return this.searchMovies(page);
			case EParamTypes.TVSHOWS:
				return this.searchTVShows(page);
		}

		return null;
	};

	details = async ({ type, name }: IParams): Promise<IShow> => {
		switch(type) {
			case EParamTypes.MOVIE:
				return this.fetchMovie(name);
			case EParamTypes.TVSHOW:
				return this.fetchTVShow(name);
		}

		return null;
	};

	searchByText = async (text: string): Promise<IShow[]> => {
		const { data } = await axios.get(
			`${this.config.getBaseURL(EProvider.ORORO)}${this.config.getSearchURL(EProvider.ORORO)}${encodeURIComponent(text)}`, {
				headers: generateHeaders(this.config, false),
			});

		const root = parse(data);
		
		const searchResult = root.querySelectorAll('a.search-results-item');
		const filtered = filter(searchResult, (item) => {
			const href = item.getAttribute('href');
			return href.startsWith('/movies') || href.startsWith('/shows');
		});

		return map(filtered, (item) => {
			const href = item.getAttribute('href');
			const name = href?.substring(href?.lastIndexOf('/') + 1);
			const info = item.querySelectorAll('.search-results-item-text p');
			const title = info?.[0]?.text;
			const year = parseInt(info?.[1]?.text?.replace(/[\S\s]*?,\s(\d{4})/, '$1'));
			const isMovie = info?.[1]?.text?.indexOf('Movie') > -1;
			const image = item.querySelector('img').getAttribute('src');

			return {
				id: null,
				name,
				title,
				year,
				image,
				description: '',
				type: isMovie ? EShowType.MOVIE: EShowType.EPISODE,
			};
		});
	};

	getDownloadInfo = async (key: string): Promise<any> => {
		const baseURL = this.config.getBaseURL(EProvider.ORORO);
		const [ fullName = '', name = key, code ] = key.match(/^(.*?)_?(s\d{2}e\d{2})?$/);
		const type = code ? EParamTypes.TVSHOW: EParamTypes.MOVIE;
		console.error(type);
		switch (type) {
			case EParamTypes.TVSHOW: {
				const { title = '', year = 1900, episodes = [] } = await this.fetchTVShow(name);
				const episode = find(episodes, ({ name: episodeName }) => fullName === episodeName);

				if (!episode) {
					throw new NotFoundException(`Count not find episode by name ${name}`);
				}

				const { id, season = 0, episode: episodeNumber = 0, image } = episode;
				const path = `${this.config.getTVShowsPath(EProvider.ORORO)}/${title} (${year})/Season ${pad2(season)}/${title} - ${standartEpisodeNumber(season, episodeNumber)}`;

				return {
					name: fullName,
					showname: name,
					title,
					season,
					episode: Number(episodeNumber),
					image,
					origin_id: id,
					url: `${baseURL}/en/shows/${name}/videos/${id}/download`,
					path,
				};
			}
			case EParamTypes.MOVIE: {
				const {
					title,
					image,
					year,
				} = await this.fetchMovie(name);

				return {
					name: fullName,
					showname: name,
					title,
					image,
					origin_id: null,
					url: `${baseURL}/en/movies/${name}/download`,
					path: `${this.config.getMoviesPath(EProvider.ORORO)}/${title} (${year})/${title} (${year})`,
				};
			}
		}

		return '';
	}

}