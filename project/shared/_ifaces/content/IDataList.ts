import { IData } from './IData';

export interface IDataList<T> extends IData {
	items: T[];
	scrollPageNumber?: number;
}