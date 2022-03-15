import * as React from 'react';
import { cx } from '~utils';
import { ILoader } from './_ifaces/ILoader';
import styles from './Loader.less';

export const Loader: React.FC<ILoader> = (props: ILoader) => {
	const {
		displaySpinner = true,
		displayText = true,
	} = props;

	return (
		<div className={cx(styles.loader)}>
			{displaySpinner && <span className={styles.loader__spinner} />}
			{displayText && <div className={styles.loader__text}>Loading...</div>}
		</div>
	);
};