import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';

const INGREDIENTS_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'John Doe',
				address: {
					street: '123 St Road',
					zipCode: '435744',
					country: 'India',
				},
				email: 'abc@myemail.com',
				deliveryMethod: 'fastest',
			},
		};
		axios
			.post('/orders.json', order)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.error(err));
	};

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => ingredients[igKey])
			.reduce((a, b) => a + b, 0);
		this.setState({ purchasable: sum > 0 });
	}

	addIngredientHandler = (type) => {
		const oldCount = Number(this.state.ingredients[type]);
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = Number(updatedCount);
		const priceAddition = Number(INGREDIENTS_PRICES[type]);
		const oldPrice = this.state.totalPrice;
		const newPrice = Number(oldPrice + priceAddition).toFixed(2);
		this.setState({
			totalPrice: Number(newPrice),
			ingredients: updatedIngredients,
		});
		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];

		if (oldCount <= 0) {
			return;
		}

		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = Number(updatedCount);
		const priceDeduction = Number(INGREDIENTS_PRICES[type]);
		const oldPrice = Number(this.state.totalPrice);
		const newPrice = Number(oldPrice - priceDeduction).toFixed(2);
		this.setState({
			totalPrice: Number(newPrice),
			ingredients: updatedIngredients,
		});
		this.updatePurchaseState(updatedIngredients);
	};

	render() {
		const disabledInfo = { ...this.state.ingredients };

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					<OrderSummary
						ingredients={this.state.ingredients}
						price={this.state.totalPrice}
						purchaseCanceled={this.purchaseCancelHandler}
						purchaseContinue={this.purchaseContinueHandler}
					/>
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					purchasable={this.state.purchasable}
					ordered={this.purchaseHandler}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;
