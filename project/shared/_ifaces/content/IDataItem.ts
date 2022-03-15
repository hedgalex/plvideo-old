import { IData } from './IData';

export interface IDataItem<T> extends IData {
	item: T;
}