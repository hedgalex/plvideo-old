import * as React from 'react';
import { 
	useContext, 
	useEffect 
} from 'react';
import { cx } from '~utils';
import { IDropDownItem } from './_ifaces/IDropDownItem';
import { DropDownContext } from '../context/DropDownContext';
import styles from '../DropDown.less';

export const DropDownItem: React.FC<IDropDownItem> = (props: IDropDownItem) => {
	const {
		className,
    children,
		value,
	} = props;

	const { 
		value: currentValue, 
		setValue,
		setDisplayValue, 
	} = useContext(DropDownContext);
	
	useEffect(() => {
		if (value === currentValue) {
			setDisplayValue(children);
		}
	}, [currentValue]);
	
	return (
		<li 
			className={cx(styles.dropdown__container__list__item, className)}
			onClick={() => {setValue(value)}}
		>
			{children}
		</li>
	); 
};
