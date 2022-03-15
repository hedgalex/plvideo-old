import * as React from 'react';
import { map } from 'lodash';
import { cx } from '~utils';
import { ISeasonsNav } from './_ifaces/ISeasonsNav';
import styles from './SeasonsNav.less';

export const SeasonsNav: React.FC<ISeasonsNav> = props => {
	const {
		seasons,
		currentSeason = 1,
		onSeasonChange = () => {},
		className,
	} = props;

	return (
		<div className={cx(styles.seasons, className)}>
			<ul>
				{map(seasons, season => (
					<li 
						key={season.id}
						className={currentSeason === season.id ? styles.active: ''}
						onClick={() => {onSeasonChange(season.id)}}
					>
						{season.id}
					</li>
				))}
			</ul> 
		</div>
	);
};