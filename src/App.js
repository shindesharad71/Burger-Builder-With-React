import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

import { Route, Switch } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<Layout>
				<Switch>
				<Route path="/orders" component={Orders} />
				<Route path="/checkout" component={Checkout} />
				<Route path="/auth" component={Auth} />
				<Route path="/" exact component={BurgerBuilder} />
				</Switch>
			</Layout>
		);
	}
}

export default App;
