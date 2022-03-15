import * as React from 'react';
import { Link } from 'react-router-dom';
import { cx } from '~utils';
import { IShowRow } from './_ifaces/IShowRow';
import { EStatus } from '~shared/_enums/EStatus';
import { EShowType } from '~shared/_enums/EShowType';
import { useContext } from 'react';
import { TasksContext } from '~tasks/context/TasksContext';
import { CONTENT_NAV_PATHS } from '../../../../consts/ContentConfig';
import { Progress } from '../../../Progress/Progress';
import { ActionButton } from '../../../ActionButton/ActionButton';
import styles from '../../ShowTable.less';

export const SHOW_ITEM_STATUS_TO_STYLE_MAP = {
	[EStatus.NO_STATUS]: '',
	[EStatus.IDLE]: styles.idle,
	[EStatus.IN_PROGRESS]: styles.inProgress,
	[EStatus.READY]: styles.ready,
}

const getLink = (type: EShowType, showname: string) => {
	switch (type) {
		case EShowType.EPISODE:
			return CONTENT_NAV_PATHS.TVSHOW.url(showname);
		case EShowType.TVSHOW:
			return CONTENT_NAV_PATHS.TVSHOW.url(showname);
		default:
			return CONTENT_NAV_PATHS.MOVIE.url(showname);
	}
};

export const ShowRow: React.FC<IShowRow> = (props) => {
	const {
		name,
		title,
		secondaryTitle = null,
		isActive = false,
		progress = 0,
		status = EStatus.NO_STATUS,
		type: dataType,
		episode,
		onClick = () => {},
		className,
	} = props;

	const showname = props.showname || name;
	const { changeTaskStatus } = useContext(TasksContext);
	const statusClassName = SHOW_ITEM_STATUS_TO_STYLE_MAP[status];
	const type = dataType ? dataType: (episode ? EShowType.EPISODE: EShowType.MOVIE);

	return (
		<div className={cx(styles.showRow, className, statusClassName)}>
			<Progress
				className={styles.progress} 
				progress={progress} 
			/>
			<div className={cx(styles.info)}>	
				<h3>
					<Link to={getLink(type, showname)}>{title}</Link>
				</h3>
				{secondaryTitle && <h4>{secondaryTitle}</h4>}
			</div>
			<div className={cx(styles.actions)}>
				<ActionButton 
					status={status} 
					onClick={() => {changeTaskStatus(name, status)}} 
				/>
			</div>
		</div>
	);
};

export { IShowRow };
