import * as React from 'react';

const NavContext = React.createContext(null);
const { Provider } = NavContext;

export {
	Provider,
	NavContext
};