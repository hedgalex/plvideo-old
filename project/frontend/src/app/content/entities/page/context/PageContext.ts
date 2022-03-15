import * as React from 'react';
import { Context } from 'react';
import { IPageContext } from '../_ifaces/IPageContext';

const PageContext: Context<IPageContext> = React.createContext({
	loaded: false,
	onMoreButtonClick: () => {},
});
const { Provider } = PageContext;

export {
	Provider,
	PageContext
};