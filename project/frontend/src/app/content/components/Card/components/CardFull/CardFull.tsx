import * as React from 'react';
import { EShowType } from '~shared/_enums/EShowType';
import { EStatus } from '~shared/_enums/EStatus';
import { ActionButton } from '~components/ActionButton/ActionButton';
import { Progress } from '~components/Progress/Progress';
import { ICardFull } from './_ifaces/ICardFull';
import styles from './CardFull.less';

export const CardFull: React.FC<ICardFull> = (props: ICardFull) => {
	const {
		name,
		title,
		poster,
		description,
		copyright,
		type = EShowType.MOVIE,
		status = EStatus.NO_STATUS,
		progress = 0,
		onAction = () => {},
	} = props;
	
	return (
		<div className={styles.card}>
			<h1 className={styles.card__title}>{title}</h1>
			<div className={styles.card__info}>
				{type === EShowType.MOVIE && (
					<Progress
						className={styles.card__info__progress} 
						progress={progress} 
					/>
				)}
				{type === EShowType.MOVIE && (
					<ActionButton
						className={styles.card__info__actions}
						status={status} 
						onClick={() => {onAction(name, status)}} 
					/>
				)}
				<img className={styles.card__info__image} src={poster} alt={title} />
				<div className={styles.card__info__description}>
					<p className={styles.card__info__description__text}>
						{description}
					</p>
					<div className={styles.card__info__description__copyright}>
						<p className={styles.card__info__description__copyright__year}>{copyright}</p>
						
					</div>
					
				</div>
			</div>
		</div>
	);
};