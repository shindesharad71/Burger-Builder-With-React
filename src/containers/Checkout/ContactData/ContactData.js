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
					value: '',
				},
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your street',
					value: '',
				},
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your zip code',
					value: '',
				},
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your country',
					value: '',
				},
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your email',
					value: '',
				},
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' },
					],
				},
			},
		},
		loading: false,
	};

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
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
		updatedOrderForm[inputIdentifier] = updatedFormElement;
		this.setState({orderForm: updatedOrderForm});
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
			<form>
				{formElementsArray.map((formElement) => {
					return (
						<Input
							key={formElement.id}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}
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
