import * as React from 'react';
import { IPageTitle } from './_ifaces/IPageTitle';
import { cx } from '~utils';
import styles from '../../Page.less';

export const PageTitle: React.FC<IPageTitle> = (props) => {
	const {
		children,
		className,
	} = props;

	return (
		<h1 className={cx(styles.page__title, className)}>
			{children}
		</h1>
	);
};