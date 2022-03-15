import * as React from 'react';
import { cx } from '~utils';
import { INav } from './_ifaces/INav';
import { NavItem } from './components/NavItem';
import { Provider } from './context/NavContext';
import { TNav } from './_types/TNav';
import styles from './Nav.less';

const Nav: TNav = (props: INav) => {
	const {
		isVertical = false,
		currentKey,
		children,
		className
	} = props;

	return (
		<Provider value={{ currentKey }}>
			<div className={cx(styles.nav, isVertical ? styles.vertical: '', className)}>
				{children}
			</div>
		</Provider>
	);
};

Nav.displayName = 'Nav';
Nav.Item = NavItem;

export { Nav };