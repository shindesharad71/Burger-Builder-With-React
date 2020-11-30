import * as actionTypes from './actionTypes';
import axios from 'axios';

const API_KEY = 'AIzaSyABfY9lRxj5J5ELcuHzhBJtTmzQ_s24ZIo';

export const authStart = () => {
	return { type: actionTypes.AUTH_START };
};

export const authSuccess = (authData) => {
	return { type: actionTypes.AUTH_SUCCESS, authData };
};

export const authFail = (error) => {
	return { type: actionTypes.AUTH_SUCCESS, error };
};

export const auth = (email, password, isSignUp) => {
	return (dispatch) => {
        let authType = 'signUp';
        
        if(!isSignUp) {
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
				dispatch(authSuccess(res.data));
			})
			.catch((err) => {
				console.error(err);
				dispatch(authFail(err));
			});
	};
};
