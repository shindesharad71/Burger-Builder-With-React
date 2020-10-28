import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

const INGREDIENTS_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

class BurgerBuilder extends Component {
	state = {
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: null,
	};

	componentDidMount() {
		axios
			.get('/ingredients.json')
			.then((res) => {
				this.setState({ ingredients: res.data });
			})
			.catch((err) => {
				console.error(err);
				this.setState({ error: err });
			});
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(
				`${encodeURIComponent(i)}=${encodeURIComponent(
					this.state.ingredients[i]
				)}`
			);
		}
		queryParams.push(`price=${this.state.totalPrice}`);
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: `?${queryString}`,
		});
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
		const disabledInfo = { ...this.props.ings };

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let burger = this.state.error ? (
			<Spinner />
		) : (
			<p>Ingredients can't be loaded!</p>
		);
		let orderSummary = <Spinner />;

		if (this.state.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						price={this.state.totalPrice}
						purchasable={this.state.purchasable}
						ordered={this.purchaseHandler}
					/>
				</Aux>
			);

			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					price={this.state.totalPrice}
					purchaseCanceled={this.purchaseCancelHandler}
					purchaseContinue={this.purchaseContinueHandler}
				/>
			);
		}

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) =>
			dispatch({
				type: actionTypes.ADD_INGREDIENT,
				ingredientName: ingName,
			}),
		onIngredientRemoved: (ingName) =>
			dispatch({
				type: actionTypes.REMOVE_INGREDIENT,
				ingredientName: ingName,
			})
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
