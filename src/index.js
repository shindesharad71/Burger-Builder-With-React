import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import burgerBuilderStore from './store/reducers/burgerBuilder';
import { HashRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

const store = createStore(burgerBuilderStore, applyMiddleware(thunk));

const app = (
	<Provider store={store}>
		<HashRouter>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</HashRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
