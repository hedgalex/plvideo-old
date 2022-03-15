import { ISeason } from '~shared/_ifaces/ISeason';

export interface ISeasonsNav extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
	seasons: ISeason[];
	currentSeason?: number;
	onSeasonChange?: Function;
}