import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Page } from '~page/Page';
import { pageLoadedAction } from '~page/actions/PageActions';
import { extractHashParameters } from '~utils';
import { Search } from '~components/Search/Search';
import { ShowTable } from '~components/index';
import { IShow } from '~shared/_ifaces/IShow';
import { EShowType } from '~shared/_enums/EShowType';
import { searchSelector } from './consts/PageSearchConsts';
import { fetchSearchAction } from './actions/PageSearchActions';
import styles from './PageSearch.less';
import { useEffect } from 'react';

const MIN_SEARCH_LENGTH = 3;
const generateSecondaryTitle = (item: IShow): string => {
	if (item.type === EShowType.MOVIE) {
		return 'Movie';
	}
	
	return 'TVShow';
}

export const PageSearch: React.FC = () => {
	const { items = [] } = useSelector(searchSelector);
	const { hash = '' } = useLocation();
	const { searchText = '' } = extractHashParameters(hash) as any;
	const dispatch = useDispatch();

	useEffect(() => {
		if (searchText.length >= MIN_SEARCH_LENGTH) {
			dispatch(fetchSearchAction(searchText));
		} else {
			dispatch(pageLoadedAction(true));
		}
	}, [searchText])

	return (
		<Page>
			<Page.Title className={styles.search_title}>
				<Search value={searchText} />
			</Page.Title>
			<Page.Content>
				<ShowTable 
					items={items}
					customSecondTitleGenerator={generateSecondaryTitle} 
				/>
			</Page.Content>
		</Page>
	)
};
