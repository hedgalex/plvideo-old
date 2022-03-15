import * as React from 'react';
import { useContext } from 'react';
import { find, map } from 'lodash';
import { 
	cx, 
	fullEpisodeCode 
} from '~utils';
import { ShowRow } from './components/ShowRow/ShowRow';
import { IEpisode } from '~shared/_ifaces/IEpisode';
import { IShow } from '~shared/_ifaces/IShow';
import { EShowType } from '~shared/_enums/EShowType';
import { TasksContext } from '~tasks/context/TasksContext';
import { IShowTable } from './_ifaces/IShowTable';
import styles from './ShowTable.less';

const generateSecondaryTitle = (item: IShow): string => {
	switch (item.type) {
		case EShowType.MOVIE: 
			return 'Movie';
		case EShowType.TVSHOW:
			return 'TVShow';
		default:
			return fullEpisodeCode((item as IEpisode).season, (item as IEpisode).episode);
	}
}

export const ShowTable: React.FC<IShowTable> = (props: IShowTable) => {
	const {
    className,
		customSecondTitleGenerator = generateSecondaryTitle,
		items,
	} = props;
	const { tasks } = useContext(TasksContext);
	return (
		<div className={cx(styles.showsTable, className)}>
			{items?.length === 0 && <p className={styles.showsTable__empty}>No content</p>}
			{map(items, (item, index: number) => {
				const task = find(tasks, task => task.name === item.name);
				return (
					<ShowRow
						key={`${item.id}_${index}`}
						{...item}
						title={item.title}
						progress={task?.progress}
						status={task?.status}
						secondaryTitle={customSecondTitleGenerator(item)}
						isActive={false}
						onClick={() => {}}
						onActionClick={() => {}}
					/>
				)
			})}
		</div>
	);
}