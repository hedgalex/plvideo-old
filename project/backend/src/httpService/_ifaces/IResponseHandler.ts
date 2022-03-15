import { EMethod } from '../_enums/EMethod';
import { IRequestProps } from './IRequestProps';

export interface IResponseHandler<Content> {
	(props: IRequestProps): Promise<Content>;
	method?: EMethod;
}