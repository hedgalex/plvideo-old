import { IResponseHandler } from '../';

export type TRoutes = {
	[key: string]: IResponseHandler<any> | any;
};