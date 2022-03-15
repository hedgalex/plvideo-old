import * as React from 'react';
import { cx } from '~utils';
import { IProgress } from './_ifaces/IProgress';
import styles from './Progress.less';

const getProgressClass = (progress: number): string  => {
	if (progress === 0) {
		return styles.idle;
	}
	if (progress <= 25) {
		return styles.progress25;
	}
	if (progress <= 50) {
		return styles.progress50;
	}
	if (progress <= 75) {
		return styles.progress75;
	}
	if (progress <= 99) {
		return styles.progress99;
	}
	
	return styles.ready;
}

export const Progress: React.FC<IProgress> = (props) => {
	const {
		progress = 0,
		className,
	} = props;

	return (
		<div className={cx(styles.progress, className)}>
			<>
				<span>{progress}%</span>
				<i className={getProgressClass(progress)} />
			</>
		</div>
	)
};
