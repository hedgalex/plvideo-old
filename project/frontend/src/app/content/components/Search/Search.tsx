import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { cx } from '~utils';
import { CONTENT_NAV_PATHS } from '../../consts/ContentConfig';
import { ISearch } from './_ifaces/ISearch';
import styles from './Search.less';

const Search: React.FC<ISearch> = props => {
	const {
		className,
		value
	} = props;

	const navigator = useNavigate();
	const onChange = (value: string) => {
		navigator(CONTENT_NAV_PATHS.SEARCH.url(value));
	}
	
	return (
		<input
			className={cx(className, styles.nav__search)}
			onChange={event => { onChange(event.target.value); }}
			type="text"
			value={value}
		/>
	);
};

export { Search };
