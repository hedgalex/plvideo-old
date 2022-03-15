import { EShowType } from "~shared/_enums/EShowType";
import { EStatus } from "~shared/_enums/EStatus";

export interface ICardFull extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  name: string;
  poster?: string;
  title?: string;
  description?: string;
  copyright?: number;
  type?: EShowType;
  progress?: number;
  status?: EStatus;
  onAction?: Function;
}