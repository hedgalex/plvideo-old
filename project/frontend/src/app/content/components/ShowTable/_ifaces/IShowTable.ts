import { IShow } from '~shared/_ifaces/IShow';

export interface IShowTable extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  items: IShow[];
  customSecondTitleGenerator?: Function;
} 