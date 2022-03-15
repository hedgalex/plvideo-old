import { IOroroRecord } from './IOroroRecord';

export interface IOroroSearchResult {
	items: IOroroRecord[];
	total_count: number;
}