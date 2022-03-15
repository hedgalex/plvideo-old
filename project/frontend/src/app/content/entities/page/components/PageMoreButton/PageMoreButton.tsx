import * as React from 'react';
import { useContext } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { IPageMoreButton } from './_ifaces/IPageMoreButton';
import { PageContext } from '../../context/PageContext';
import { cx } from '~utils';
import styles from '../../Page.less';

export const PageMoreButton: React.FC<IPageMoreButton> = (props) => {
	const {
		className,
	} = props;

	const {
		loaded,
		onMoreButtonClick,
	} = useContext(PageContext);

	return (
		<div className={cx(styles.page__more, className)} onClick={() => { loaded && onMoreButtonClick() }}>
			<AiOutlineCaretDown />
		</div>
	)
};