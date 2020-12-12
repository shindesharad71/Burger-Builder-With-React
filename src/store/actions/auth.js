import * as actionTypes from './actionTypes';
import axios from 'axios';

const API_KEY = 'AIzaSyABfY9lRxj5J5ELcuHzhBJtTmzQ_s24ZIo';

export const authStart = () => {
	return { type: actionTypes.AUTH_START };
};

export const authSuccess = (idToken, userId) => {
	return { type: actionTypes.AUTH_SUCCESS, idToken, userId };
};

export const authFail = (error) => {
	return { type: actionTypes.AUTH_FAIL, error };
};

export const logout = () => {
	return { type: actionTypes.AUTH_LOGOUT };
};

export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const auth = (email, password, isSignUp) => {
	return (dispatch) => {
		let authType = 'signUp';

		if (!isSignUp) {
			authType = 'signInWithPassword';
		}

		dispatch(authStart());
		axios
			.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:${authType}?key=${API_KEY}`,
				{ email, password, returnSecureToken: true }
			)
			.then((res) => {
				console.log(res.data);
				dispatch(authSuccess(res.data.idToken, res.data.localId));
				dispatch(checkAuthTimeout(res.data.expiresIn));
			})
			.catch((err) => {
				console.error(err);
				dispatch(authFail(err.response.data.error));
			});
	};
};
