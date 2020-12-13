import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions'

class App extends Component {
	componentDidMount() {
		this.props.onTrySignup();
	}

	render() {
		return (
			<Layout>
				<Switch>
				<Route path="/orders" component={Orders} />
				<Route path="/checkout" component={Checkout} />
				<Route path="/auth" component={Auth} />
				<Route path="/logout" component={Logout} />
				<Route path="/" exact component={BurgerBuilder} />
				</Switch>
			</Layout>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onTrySignup: () => dispatch(actions.authCheckState())
	};
}

export default withRouter(connect(null, mapDispatchToProps)(App));
