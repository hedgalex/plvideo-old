import { TDropDownValue } from "../../context/_types/TDropDownValue";

export interface IDropDownItem extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>{
  value: TDropDownValue;
}
