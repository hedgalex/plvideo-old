import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Cards } from '~components/Card/Cards';
import { fetchTVShowsAction } from './actions/PageTVShowsActions';
import { contentTVShowsSelector } from './consts/PageTVShowsConsts';
import { CONTENT_NAV_PATHS } from '~app/content/consts/ContentConfig';
import { Page } from '~page/Page';

export const PageTVShows: React.FC = () => {
	const {
		items = [],
		scrollPageNumber = 0,
	} = useSelector(contentTVShowsSelector);

	const navigator = useNavigate();
	const onCardClick = (name: string) => {
		navigator(CONTENT_NAV_PATHS.TVSHOW.url(name));
	};

	const loader = () => fetchTVShowsAction(scrollPageNumber + 1);

	return (
		<Page loader={loader}>
			<Page.Title>TVShows</Page.Title>
			<Page.Content>
				<Cards
					items={items} 
					onCardClick={onCardClick}	
				/>
				<Page.MoreButton />
			</Page.Content>
		</Page>
	);
};
