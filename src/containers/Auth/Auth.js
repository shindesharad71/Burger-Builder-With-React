import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.scss';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
		},
		isSignUp: true,
	};

	componentDidMount() {
		if (!this.props.buildingBurger && this.props.authRedirect !== '/') {
			this.props.onSetAuthRedirectPath();
		}
	}

	switchAuthModeHandler = () => {
		this.setState((prevState) => {
			return { isSignUp: !prevState.isSignUp };
		});
	};

	checkValidity = (value, rules) => {
		let isValid = true;
		if (rules.required) {
			isValid = value.trim() !== '';
		}

		return isValid;
	};

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(
					event.target.value,
					this.state.controls[controlName].validation
				),
				touched: true,
			},
		};
		this.setState({ controls: updatedControls });
	};

	onSubmitHandler = (event) => {
		event.preventDefault();
		if(this.state.controls.email.value && this.state.controls.password.value) {
			this.props.onAuth(
				this.state.controls.email.value,
				this.state.controls.password.value,
				this.state.isSignUp
			);
		}
	};

	render() {
		const formElementsArray = [];

		for (const key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key],
			});
		}

		let form = formElementsArray.map((formElement) => (
			<Input
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={(event) =>
					this.inputChangedHandler(event, formElement.id)
				}
			/>
		));

		if(this.props.loading) {
			form = <Spinner />;
		}

		let errorMessage = null;

		if(this.props.error) {
			errorMessage = (
				<p>{this.props.error.message}</p>	
			);
		}

		let authRedirect = null;
		if(this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirect}/>;
		}

		return (
			<div className={classes.Auth}>
				{authRedirect}
				{errorMessage}
				<form onSubmit={this.onSubmitHandler}>
					{form}
					<Button btnType="Success">SUBMIT</Button>
					<Button
						btnType="Danger"
						clicked={this.switchAuthModeHandler}
					>
						SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
					</Button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirect: state.auth.authRedirect
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, isSignUp) =>
			dispatch(actions.auth(email, password, isSignUp)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
