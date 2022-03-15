import * as React from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Page } from '~page/Page';
import { TasksContext } from '~tasks/context/TasksContext';
import { Cards } from '~components/Card/Cards';
import { CONTENT_NAV_PATHS } from '~app/content/consts/ContentConfig';
import { fetchMoviesAction } from './actions/PageMoviesActions';
import { contentMoviesSelector } from './consts/PageMoviesConsts';

export const PageMovies: React.FC = () => {
	const {
		items = [],
		scrollPageNumber = 0,
	} = useSelector(contentMoviesSelector);

	const loader = () => fetchMoviesAction(scrollPageNumber + 1);
	const navigator = useNavigate();
	const onCardClick = (name: string) => {
		navigator(CONTENT_NAV_PATHS.MOVIE.url(name));
	};
	const { changeTaskStatus } = useContext(TasksContext);

	return (
		<Page loader={loader}>
			<Page.Title>Movies</Page.Title>
			<Page.Content>
				<Cards 
					items={items}
					onCardClick={onCardClick}
					onActionClick={changeTaskStatus}
				/>
				<Page.MoreButton />
			</Page.Content>
		</Page>
	)
};