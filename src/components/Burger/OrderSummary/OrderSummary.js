import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

	componentDidUpdate() {
		
	}

	render() {

		const ingredientSummary = Object.keys(this.props.ingredients).map((igKey) => (
			<li key={igKey}>
				<span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
				{this.props.ingredients[igKey]}
			</li>
		));

		return (
			<Aux>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>{ingredientSummary}</ul>
				<p><strong>Total Price: {this.props.price}</strong></p>
				<p>Continue to checkout?</p>
				<Button clicked={this.props.purchaseCanceled} btnType="Danger">
					CANCEL
				</Button>
				<Button clicked={this.props.purchaseContinue} btnType="Success">
					CONTINUE
				</Button>
			</Aux>
		);
	}
}

export default OrderSummary;
