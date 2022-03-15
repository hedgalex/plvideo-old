import * as React from 'react';
import { useContext } from 'react';
import { find } from 'lodash';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Page } from '~page/Page';
import { TasksContext } from '~tasks/context/TasksContext';
import { CardFull } from '~components/Card/components/CardFull/CardFull';
import { fetchMovieAction } from './actions/PageMovieActions';
import { contentMovieSelector } from './consts/PageMovieConsts';
import styles from './PageMovie.less';

export const PageMovie: React.FC = () => {
	const { name } = useParams();
	const { item } = useSelector(contentMovieSelector);
	const {
		title = '',
		description = '',
		image,
		year,
		type,
	} = item || {};

	const { tasks, changeTaskStatus } = useContext(TasksContext);
	const task = find(tasks, task => task.name === name);

	return (
		<Page loader={() => fetchMovieAction(name)}>
			<Page.Content>
				<CardFull
					name={name}				
					title={title}
					poster={image}
					description={description}
					copyright={year}
					type={type}
					progress={task?.progress}
					status={task?.status} 
					onAction={changeTaskStatus}
				/>
			</Page.Content>
		</Page>
	);
};
