import * as React from 'react';
import { Context } from 'react';
import { IDropDownContext } from './_ifaces/IDropDownContext';

const DropDownContext: Context<IDropDownContext> = React.createContext(null);
const { Provider } = DropDownContext;

export {
	Provider,
	DropDownContext
};