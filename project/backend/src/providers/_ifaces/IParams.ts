import { EParamTypes } from '../_enums/EParamTypes';

export interface IParams {
	name?: string;
	type?: EParamTypes;
	page?: number;
	id?: number;
}