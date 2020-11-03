import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import burgerBuilder from './store/reducers/burgerBuilder';
import { HashRouter } from 'react-router-dom';

const store = createStore(burgerBuilder);

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
