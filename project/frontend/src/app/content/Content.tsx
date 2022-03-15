import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Tasks } from '~tasks/Tasks';
import { Navigator } from '~components/Navigator/Navigator';
import { PageTVShows } from '~page/entities/tvshows/PageTVShows';
import { PageTVShow } from '~page/entities/tvshow/PageTVShow';
import { PageMovies } from '~page/entities/movies/PageMovies';
import { PageMovie } from '~page/entities/movie/PageMovie';
import { PageDownloads } from '~page/entities/downloads/PageDownloads';
import { PageSearch } from '~page/entities/search/PageSearch';
import { CONTENT_NAV_PATHS } from './consts/ContentConfig';
import styles from './Content.less';

export const Content: React.FC = () => (
	<div className={styles.content}>
		<Navigator />
		<Tasks>
			<Routes>
				<Route path="/" element={<PageTVShows />} />
				<Route path={CONTENT_NAV_PATHS.TVSHOWS.path} element={<PageTVShows />} />
				<Route path={CONTENT_NAV_PATHS.TVSHOW.path} element={<PageTVShow />} />
				<Route path={CONTENT_NAV_PATHS.MOVIES.path} element={<PageMovies />} />
				<Route path={CONTENT_NAV_PATHS.MOVIE.path} element={<PageMovie />} />
				<Route path={CONTENT_NAV_PATHS.DOWNLOADS.path} element={<PageDownloads />} />
				<Route path={CONTENT_NAV_PATHS.SEARCH.path} element={<PageSearch />} />
			</Routes>
		</Tasks>
	</div>
);
