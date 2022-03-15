import * as React from 'react';
import { useContext } from 'react';
import { IPageContent } from './_ifaces/IPageContent';
import { PageContext } from '../../context/PageContext';
import { cx } from '~utils';
import { Loader } from '../../../../components/Loader/Loader';
import styles from '../../Page.less';

export const PageContent: React.FC<IPageContent> = (props) => {
	const {
		children,
		className,
	} = props;

  const { loaded } = useContext(PageContext);

	return (
		<div className={cx(styles.page__content, className)}>
      {!loaded && <Loader />}
      {loaded && children}
		</div>
	);
};