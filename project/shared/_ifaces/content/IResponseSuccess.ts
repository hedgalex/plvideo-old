import { IData } from '~shared/_ifaces/content/IData';
import { IResponse } from './IResponse';

export interface IResponseSuccess extends IResponse {
  data: IData;
}