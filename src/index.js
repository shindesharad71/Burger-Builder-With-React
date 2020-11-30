import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import { HashRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	order: orderReducer,
	auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

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
