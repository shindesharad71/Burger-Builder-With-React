import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	authRedirect: '/'
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return updateObject(state, { error: null, loading: true });
		case actionTypes.AUTH_SUCCESS:
			return updateObject(state, {
				error: null,
				loading: false,
				token: action.idToken,
				userId: action.userId,
			});
		case actionTypes.AUTH_FAIL:
			return updateObject(state, { error: action.error, loading: false });

		case actionTypes.AUTH_LOGOUT:
			return {...state, token: null, userId: null};
		case actionTypes.SET_AUTH_REDIRECT_PATH:
			return {...state, redirectPath: action.path};

		default:
			return state;
	}
};

export default reducer;
