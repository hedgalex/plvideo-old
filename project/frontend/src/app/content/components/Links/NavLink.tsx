import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { INavLink } from './_ifaces/INavLink';

export const NavLink: React.FC<INavLink> = (props: INavLink) => {
	const {
		children,
		to,
	} = props;

	const navigator = useNavigate();
	const onClick = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		navigator(to);
	}

	return <Link onClick={onClick} to={to}>{children}</Link>
};