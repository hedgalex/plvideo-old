import * as React from 'react';
import { cx } from '~utils';
import { TPage } from './_types/TPage';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { PageTitle } from './components/PageTitle/PageTitle';
import { PageContent } from './components/PageContent/PageContent';
import { PageMoreButton } from './components/PageMoreButton/PageMoreButton';
import { pageSelector } from './selectors/PageSelectors';
import { Provider } from './context/PageContext';
import styles from './Page.less';

const Page: TPage = (props) => {
	const {
		children,
		className,
		loader,
	} = props;

	const dispatch = useDispatch();
	const { loaded } = useSelector(pageSelector, shallowEqual);

	const fetchPageData = () => {
		if (loader) {
			dispatch(loader());
		}
	};

	if (!loaded) {
		fetchPageData();
	}

	return (
		<Provider value={{ loaded, onMoreButtonClick: fetchPageData }}>
			<div className={cx(styles.page, className)}>
				{children}
			</div>
		</Provider>
	);

};

Page.Title = PageTitle;
Page.Content = PageContent;
Page.MoreButton = PageMoreButton;

export { Page };