import { find, values } from 'lodash';
import { IShow } from '~shared/_ifaces/IShow';
import { IDataList } from '~shared/_ifaces/content/IDataList';
import { EProvider } from '~shared/_enums/EProvider';
import { EParamTypes } from '~server/providers/_enums/EParamTypes';
import {
	EMethod,
	IRequestProps,
	NotFoundException,
	TCookies,
	TParams,
	TQuery,
} from '~server/httpService';
import { IProvider } from '~server/providers/_ifaces/IProvider';
import { ProviderManager } from '~server/providers/ProviderManager';
import { IResponseHandler } from '../../httpService/_ifaces/IResponseHandler';

interface IScanParams extends TParams {
	type?: EParamTypes;
	name?: string;
}

interface IScanQuery extends TQuery {
	page?: number;
}

const Scan: IResponseHandler<IDataList<IShow>> = async (props: IRequestProps) => {
	const {
		params = {} as IScanParams,
		query = {} as IScanQuery,
		cookies = { provider: EProvider.MOCK } as TCookies,
	} = props;

	const {
		type: searchType = EParamTypes.TVSHOWS,
		name = '',
	} = params;
	const { provider: providerName = EProvider.MOCK } = cookies;

	const { page = 0 } = query;
	const typeExist = find(values(EParamTypes), type => searchType === type);

	if (!typeExist) {
		throw new NotFoundException();
	}

	const provider: IProvider = ProviderManager.getProvider(providerName);
	const items = await provider.scan({
		type: searchType,
		name,
		page: Number(page)
	});

	// fs.writeFile(`./scan_${searchType}.json`, JSON.stringify(items), 'utf8', () => {});

	return {
		items,
		scrollPageNumber: Number(page),
	}
};

Scan.method = EMethod.GET;

export { Scan };