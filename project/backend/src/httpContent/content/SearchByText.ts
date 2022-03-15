import { IShow } from '~shared/_ifaces/IShow';
import { IDataList } from '~shared/_ifaces/content/IDataList';
import { EProvider } from '~shared/_enums/EProvider';
import { ProviderManager } from '~server/providers/ProviderManager';
import {
	EMethod,
	TQuery,
	TCookies,
	IResponseHandler,
	IRequestProps,
} from '~server/httpService';

interface ISearchByTextQuery extends TQuery {
	text?: string;
}

const SearchByText: IResponseHandler<IDataList<IShow>> = async (props: IRequestProps) => {
	const {
		query = {} as ISearchByTextQuery,
		cookies = { provider: EProvider.MOCK } as TCookies,
	} = props;

	const { provider: providerName = EProvider.MOCK } = cookies;
	const { text = '' } = query;
	const provider = ProviderManager.getProvider(providerName);
	const items = await provider.searchByText(text);

	// fs.writeFile(`./search_${text}.json`, JSON.stringify(items), 'utf8', () => {});

	return {
		items,
		scrollPageNumber: 0
	}
};

SearchByText.method = EMethod.GET;

export { SearchByText };