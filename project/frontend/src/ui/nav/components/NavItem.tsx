import * as React from 'react';
import { useContext } from 'react';
import { cx } from '~utils';
import { INavItem } from './_ifaces/INavItem';
import { NavContext } from '../context/NavContext';
import styles from '../Nav.less';

const NavItem: React.FC<INavItem> = (props: INavItem) => {
	const {
		itemKey, 
		children,
		className,
		activeClassname,
	} = props;

	const { currentKey } = useContext(NavContext);
	const activeClassName = currentKey === itemKey ? cx(styles.nav__item__active, activeClassname): '';

	return (
		<button className={cx(styles.nav__item, activeClassName, className)}>
			{children}
		</button>
	);
};

NavItem.displayName = 'NavItem';

export { NavItem };