import React, { useState, useEffect } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const BurgerBuilder = props => {
	useEffect(() => {
		props.onInitIngredients();
	}, []);

	const [purchasing, setPurchasing] = useState(false);

	const purchaseHandler = () => {
		if(props.isAuthenticated) {
			setPurchasing(true);
		} else {
			props.onSetRedirectPath('/checkout');
			props.history.push('/auth');
		}
	};

	const purchaseCancelHandler = () => {
		setPurchasing(false);
	};

	const purchaseContinueHandler = () => {
		props.onInitPurchase();
		props.history.push('/checkout');
	};

	const updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map((igKey) => ingredients[igKey])
			.reduce((a, b) => a + b, 0);
		return sum > 0;
	}

		const disabledInfo = { ...props.ings };

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let burger = props.error ? (
			<Spinner />
		) : (
			<p>Ingredients can't be loaded!</p>
		);
		let orderSummary = <Spinner />;

		if (props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={props.ings} />
					<BuildControls
						ingredientAdded={props.onIngredientAdded}
						ingredientRemoved={props.onIngredientRemoved}
						disabled={disabledInfo}
						price={props.price}
						purchasable={updatePurchaseState(props.ings)}
						ordered={purchaseHandler}
						isAuth={props.isAuthenticated}
					/>
				</Aux>
			);

			orderSummary = (
				<OrderSummary
					ingredients={props.ings}
					price={props.price}
					purchaseCanceled={purchaseCancelHandler}
					purchaseContinue={purchaseContinueHandler}
				/>
			);
		}

		return (
			<Aux>
				<Modal
					show={purchasing}
					modalClosed={purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: Number(state.burgerBuilder.totalPrice).toFixed(2),
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) =>
			dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) =>
			dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () =>
			dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
