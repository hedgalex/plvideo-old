export const CONTENT_NAV_PATHS = {
	TVSHOWS: {
		key: 'TVSHOWS',
		url: () => '/tvshows',
		path: '/tvshows',
		exact: true,
	},
	TVSHOW: {
		key: 'TVSHOW',
		url: (name: string) => `/tvshow/${name}`,
		path: '/tvshow/:name',
	},
	MOVIES: {
		key: 'MOVIES',
		url: () => '/movies',
		path: '/movies',
	},
	MOVIE: {
		key: 'MOVIE',
		url: (name: string) => `/movie/${name}`,
		path: '/movie/:name',
	},
	DOWNLOADS: {
		key: 'DOWNLOADS',
		url: () => '/downloads',
		path: '/downloads',
	},
	SEARCH: {
		key: 'SEARCH',
		url: (text: string) => `/search/#searchText=${encodeURIComponent(text)}`,
		path: '/search/',
	},
};