import * as React from 'react';
import { Page } from '~page/Page';
import { useSelector } from 'react-redux';
import { ShowTable } from '~components/index';
import { fetchDownloadsAction } from './actions/PageDownloadsActions';
import { contentDownloadsSelector } from './consts/PageDownloadsConsts';
import { fullEpisodeCode } from '~utils';
import { IEpisode } from '~shared/_ifaces/IEpisode';
import { IShow } from '~shared/_ifaces/IShow';

const secondTitleGenerator = (item: IShow): string => {
	const show = item as IEpisode;
	if (show.episode) {
		return fullEpisodeCode(show.season, show.episode);
	}

	return 'Movie';
}

export const PageDownloads: React.FC = () => {
	const { items } = useSelector(contentDownloadsSelector);

	return (
		<Page loader={fetchDownloadsAction}>
			<Page.Title>Downloads</Page.Title>
			<Page.Content>
				<ShowTable 
					items={items}
					customSecondTitleGenerator={secondTitleGenerator} 
				/>
			</Page.Content>
		</Page>
	)
}