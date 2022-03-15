import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CONTENT_NAV_PATHS } from '~app/content/consts/ContentConfig';
import { pageResetAction } from '~page/actions/PageActions';
import { NavLink } from '../Links/NavLink';
import { ProviderPicker } from '~components/ProviderPicker/ProviderPicker';
import { Nav } from '~ui/nav/Nav';
import styles from './Navigator.less';

export const Navigator: React.FC = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const { pathname, search } = location;
	const path = pathname + search;
	// const { key: currentKey = CONTENT_NAV_PATHS.TVSHOWS } = find(CONTENT_NAV_PATHS, (navPath) => matchPath(path, navPath));
	const currentKey = CONTENT_NAV_PATHS.TVSHOWS;
	
	/** On history changed */
	useEffect(() => {
		dispatch(pageResetAction());
	}, [path]);

	return (
		<div>
			<Nav currentKey={currentKey} className={styles.nav}>
				<Nav.Item key="tvshows" itemKey={CONTENT_NAV_PATHS.TVSHOWS.key} className={styles.nav__item}>
					<NavLink to="/tvshows">TVSHOWS</NavLink>
				</Nav.Item>
				<Nav.Item key="movies" itemKey={CONTENT_NAV_PATHS.MOVIES.key} className={styles.nav__item}>
					<NavLink to="/movies">MOVIES</NavLink>
				</Nav.Item>
				<Nav.Item key="downloads" itemKey={CONTENT_NAV_PATHS.DOWNLOADS.key} className={styles.nav__item}>
					<NavLink to="/downloads">DOWNLOADS</NavLink>
				</Nav.Item>
				<Nav.Item key="search" itemKey={CONTENT_NAV_PATHS.SEARCH.key} className={styles.nav__item}>
					<NavLink to="/search">SEARCH</NavLink>
				</Nav.Item>
				<div className={styles.nav__provider}>
					<ProviderPicker />
				</div>
			</Nav>
			
			
			<div className={styles.header}></div>
		</div>
	);
};