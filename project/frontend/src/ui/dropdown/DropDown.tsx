import * as React from 'react';
import { cx } from '~utils';
import { useState } from 'react';
import { IDropDown } from './_ifaces/IDropDown';
import { TDropDown } from './_types/TDropDown';
import { TDropDownValue } from './context/_types/TDropDownValue';
import { DropDownItem } from './components/DropDownItem';
import { Provider } from './context/DropDownContext';
import styles from './DropDown.less';

export const DropDown: TDropDown = (props: IDropDown) => {
	const {
		className,
    children,
    defaultValue = '',
    onChange,
	} = props;

  const [ value, setValue ] = useState(defaultValue);
  const [ displayValue, setDisplayValue ] = useState(defaultValue);
	const [ isOpen, setOpen ] = useState(false);

  const setValueWrapper = (newValue: TDropDownValue) => {
    setOpen(false);
    if (value !== newValue) {
      setValue(newValue);
      onChange && onChange(newValue);
    }
  }

	return (
    <Provider value={{ setValue: setValueWrapper, value, setDisplayValue }}>
      <div 
        className={cx(styles.dropdown, className)}
        tabIndex={0}
        onBlur={() => {setOpen(false);}}
      >
        <div 
          className={styles.dropdown__header} 
          onClick={() => {setOpen(!isOpen);}}
        >
          {displayValue}
        </div>
        <div className={cx(styles.dropdown__container, isOpen? styles.open: '')}>
          <ul className={cx(styles.dropdown__container__list)}>
            {children}
          </ul>
        </div>
      </div>
    </Provider>	
	);
};

DropDown.Item = DropDownItem;