import { find, values } from 'lodash';
import { IDataItem } from '~shared/_ifaces/content/IDataItem';
import { IShow } from '~shared/_ifaces/IShow';
import { EProvider } from '~shared/_enums/EProvider';
import { IProvider } from '~server/providers/_ifaces/IProvider';
import { ProviderManager } from '~server/providers/ProviderManager';
import { EParamTypes } from '~server/providers/_enums/EParamTypes';
import {
	IResponseHandler,
	EMethod,
	TQuery,
	TParams,
	NotFoundException,
	IRequestProps,
	TCookies,
} from '~server/httpService';

interface IInfoParams extends TParams {
	type?: EParamTypes;
	name?: string;
}

interface IInfoQuery extends TQuery {
	page?: number;
}

const Details: IResponseHandler<IDataItem<IShow>> = async (props: IRequestProps) => {
	const {
		params = {} as IInfoParams,
		query = {} as IInfoQuery,
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

	const service: IProvider = ProviderManager.getProvider(providerName);
	const showDetails = await service.details({
		type: searchType,
		name,
		page: Number(page),
	});

	// fs.writeFile(`./details_${name}.json`, JSON.stringify(showDetails), 'utf8', () => {});

	return {
		item: showDetails,
	}
};

Details.method = EMethod.GET;

export { Details };