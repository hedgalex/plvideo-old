import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import { configureStore } from '~store/store';
import { Content } from '~app/content/Content';
import { Provider } from 'react-redux';

ReactDOM.render(
	<Provider store={configureStore()}>
		<Router>
			<Content />
		</Router>
	</Provider>,
	document.getElementById('app')
);