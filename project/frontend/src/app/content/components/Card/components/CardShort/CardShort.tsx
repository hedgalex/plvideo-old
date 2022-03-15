import * as React from 'react';
import { EShowType } from '~shared/_enums/EShowType';
import { EStatus } from '~shared/_enums/EStatus';
import { cx } from '~utils';
import { ActionButton } from '~components/ActionButton/ActionButton';
import { Progress } from '~components/Progress/Progress';
import { ICardShort } from './_ifaces/ICardShort';
import styles from './CardShort.less';

export const SHOW_ITEM_STATUS_TO_STYLE_MAP = {
	[EStatus.NO_STATUS]: '',
	[EStatus.IDLE]: styles.idle,
	[EStatus.IN_PROGRESS]: styles.inProgress,
	[EStatus.READY]: styles.ready,
}

const CardShort: React.FC<ICardShort> = (props: ICardShort) => {
	const {
		className,
		title,
		name,
		image,
		year,
		status = EStatus.NO_STATUS,
		type = EShowType,
		progress = 0,
		onCardClick = () => {},
		onActionClick = () => {},
	} = props;
	const statusClassName = SHOW_ITEM_STATUS_TO_STYLE_MAP[status];

	return (
		<div className={cx(styles.card, className, statusClassName)}>
			<img 
				className={styles.card__image} 
				src={image} 
				alt={title}
				onClick={() => {onCardClick(name)}} 
			/>
			<span className={styles.card__year}>{year}</span>
			{type === EShowType.MOVIE && (
				<ActionButton
					className={styles.card__actions}
					status={status} 
					onClick={() => {onActionClick(name, status)}} 
				/>
			)}
			{progress > 0 && 
				<Progress 
					className={styles.card__progress} 
					progress={progress} 
				/>
			}
		</div>
	);
};

export { CardShort };