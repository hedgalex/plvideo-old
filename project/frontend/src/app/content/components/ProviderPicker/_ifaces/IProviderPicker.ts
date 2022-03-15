import { TDropDownValue } from '~ui/dropdown/context/_types/TDropDownValue';

export interface IProviderPicker extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>{
  onChange?(value: TDropDownValue): void;
}
