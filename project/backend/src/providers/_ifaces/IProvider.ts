import { IShow } from '~shared/_ifaces/IShow';
import { IConfig } from '~server/config/_ifaces/IConfig';
import { IParams } from './IParams';

export interface IProvider {
	scan (params: IParams): Promise<IShow[]>;
	details (params: IParams): Promise<IShow>;
	searchByText (text: string): Promise<IShow[]>;
	getDownloadInfo (key: string): Promise<any>;
}

export interface IProviderContructor {
	new (config: IConfig): IProvider;
}