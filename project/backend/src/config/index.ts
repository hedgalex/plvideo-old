import * as fs from 'fs';
import { each, forIn, startsWith } from 'lodash';
import { IConfig } from './_ifaces/IConfig';

class Config implements IConfig {

	private config = {};
	private headers = {};

	constructor() {
		const { PROJECT_CONFIG_PATH } = process?.env;
		if (!PROJECT_CONFIG_PATH) {
			console.error('No PROJECT_CONFIG_PATH property');
			process.exit();
		}

		const file = fs.readFileSync(PROJECT_CONFIG_PATH, { encoding: 'utf-8' });
		each(file.split('\n'), (property: string) => {
			if (property?.trim()) {
				const [ line = '', name = '', value = '' ] = property.match(/^([\S\s]*?)=([\S\s]*)$/);
				if (name) {
					this.config[name] = value;
				}
			}
		});
	}

	getBaseURL = (service: string) => this.config[`${service}.baseURL`];

	getMoviesPath = (service: string) => this.config[`${service}.movies.path`];

	getTVShowsPath = (service: string) => this.config[`${service}.tvshows.path`];

	getSearchURL = (service: string) => this.config[`${service}.search.url`];

	getMoviesURL = (service: string) => `${this.getBaseURL(service)}${this.config[`${service}.movies.url`]}`;

	getTVShowsURL = (service: string) => `${this.getBaseURL(service)}${this.config[`${service}.tvshows.url`]}`;

	getCookies = (service: string) => this.config[`${service}.headers.cookie`]

	getHeaders = (service: string) => {
		if (!this.headers[service]) {
			this.headers[service] = {};
			const headers = this.headers[service];
			const headerKey = `${service}.headers.`;
			forIn(this.config, (value, key) => {
				if(startsWith(key, headerKey)) {
					headers[key.replace(headerKey, '')] = value;
				}
			});
		}

		return this.headers[service];
	}

	getDownloadInterval = () => parseInt(this.config['download.interval']);

	getDownloadTimeout = () => parseInt(this.config['download.timeout'])

	getKnexConfig = () => ({
		client: 'pg',
		searchPath: ['knex', 'public'],
		connection: this.config['db.url'],
	});
}

const config = new Config();

export { 
	config,
	IConfig, 
};