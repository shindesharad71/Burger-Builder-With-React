import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.scss';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
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

	render() {
		let form = (
			<form>
				<Input inputtype="input" type="text" name="name" placeholder="Your name" />
				<Input inputtype="input" type="email" name="email" placeholder="Your email" />
				<Input inputtype="input" type="text" name="street" placeholder="Your street" />
				<Input inputtype="input"
					type="text"
					name="postal"
					placeholder="Your postal code"
				/>
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
