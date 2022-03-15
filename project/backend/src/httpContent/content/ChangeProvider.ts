import { EProvider } from '~shared/_enums/EProvider';
import { IData } from '~shared/_ifaces/content/IData';
import { EMethod } from '~server/httpService/_enums/EMethod';
import { 
	IResponseHandler, 
	IRequestProps,
	TParams,
} from '~server/httpService';

interface IProviderParams extends TParams {
	name: string;
}

const ChangeProvider: IResponseHandler<IData> = async (props: IRequestProps) => {
	const { 
		params = {} as IProviderParams,
		response,
	} = props;
	const name = params.name || EProvider.MOCK;
	response.cookie('provider', name, { httpOnly: true });

	return { item: name };
};

ChangeProvider.method = EMethod.POST;

export { ChangeProvider };