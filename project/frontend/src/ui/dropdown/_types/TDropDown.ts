import { IDropDownItem } from '../components/_ifaces/IDropDownItem';
import { IDropDown } from '../_ifaces/IDropDown';

export type TDropDown = React.FC<IDropDown> & {
	Item?: React.FC<IDropDownItem>;
}