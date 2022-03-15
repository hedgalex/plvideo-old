import { IDataItem } from '~shared/_ifaces/content/IDataItem';
import { EProvider } from '~shared/_enums/EProvider';
import { EMethod } from '~server/httpService/_enums/EMethod';
import { 
	IResponseHandler, 
	IRequestProps,
	TCookies,
} from '~server/httpService';

const Provider: IResponseHandler<IDataItem<string>> = async (props: IRequestProps) => {
	const { 
		cookies = { provider: EProvider.MOCK } as TCookies,
	} = props;
	
	const { provider: providerName = EProvider.MOCK } = cookies;

	return { item: providerName };
};

Provider.method = EMethod.GET;

export { Provider };