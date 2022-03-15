import { IShow } from '~shared/_ifaces/IShow';

export interface ICards extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>{
	items: IShow[];
  onCardClick?: Function;
	onActionClick?: Function;
}
