import * as React from 'react';
import { useSelector } from 'react-redux';
import { filter } from 'lodash';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Page } from '~page/Page';
import { ShowTable } from '~components/index';
import { CardFull } from '~components/Card/components/CardFull/CardFull';
import { fetchTVShowAction } from './actions/PageTVShowActions';
import { contentTVShowSelector } from './consts/PageTVShowConsts';
import { SeasonsNav } from './components/SeasonsNav/SeasonsNav';
import styles from './PageTVShow.less';

export const PageTVShow: React.FC = () => {
	const { name } = useParams();
	const { hash = '#season=1' } = useLocation();
	const { item } = useSelector(contentTVShowSelector);
	const navigator = useNavigate();
	const changeSeason = (seasonId: number) => {
		navigator(`#season=${seasonId}`);
	}

	const matches = hash.match(/^#season=(\d+?)$/);
	const currentSeason = Number.parseInt(matches?.length > 1 ? matches[1]: '1');
	const {
		title = '',
		description = '',
		image,
		episodes,
		seasons,
		year,
		type,
	} = item || {};
	const items = filter(episodes, ({season}) => season === currentSeason);
	return (
		<Page loader={() => fetchTVShowAction(name)}>
			<Page.Content>
				<CardFull
					name={name}
					title={title}
					poster={image}
					description={description}
					copyright={year}
					type={type}
				/>
				<SeasonsNav 
					className={styles.seasons} 
					seasons={seasons}
					currentSeason={currentSeason}
					onSeasonChange={changeSeason}
				/>
				<ShowTable
					className={styles.episodes} 
					items={items} 
				/>
			</Page.Content>
		</Page>
	);
};
