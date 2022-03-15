import { TDropDownValue } from "../context/_types/TDropDownValue";

export interface IDropDown extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>{
  defaultValue?: any;
  onChange?(value: TDropDownValue): void; 
}
