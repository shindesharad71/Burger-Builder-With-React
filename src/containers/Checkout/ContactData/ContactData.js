import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.scss';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your name',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your street',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your zip code',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your country',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your email',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' },
					],
				},
				value: '',
			},
		},
		loading: false,
	};

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });

		const formData = {};
		for (const formIdentifier in this.state.orderForm) {
			formData[formIdentifier] = this.state.orderForm[
				formIdentifier
			].value;
		}

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData,
		};
		axios
			.post('/orders.json', order)
			.then((res) => {
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch((err) => {
				console.error(err);
				this.setState({ loading: false });
			});
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = { ...this.state.orderForm };
		const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
		updatedFormElement.value = event.target.value;

		if (updatedFormElement.validation) {
			updatedFormElement.valid = this.checkValidity(
				updatedFormElement.value,
				updatedFormElement.validation
			);
		}

		updatedOrderForm[inputIdentifier] = updatedFormElement;
		this.setState({ orderForm: updatedOrderForm });
	};

	checkValidity = (value, rules) => {
		let isValid = true;
		if (rules.required) {
			isValid = value.trim() !== '';
		}

		return isValid;
	};

	render() {
		const formElementsArray = [];

		for (const key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map((formElement) => {
					return (
						<Input
							key={formElement.id}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}
							invalid={!formElement.config.valid}
							shouldValidate={formElement.config.validation}
							changed={(event) =>
								this.inputChangedHandler(event, formElement.id)
							}
						/>
					);
				})}
				<Button btnType="Success" clicked={this.orderHandler}>
					ORDER
				</Button>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
