import { all, call, put, takeLatest } from "redux-saga/effects";
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
	getCurrentUser,
	signInAuthWithEmailAndPassword,
	signInWithGooglePopup,
	signOutUser,
} from "../../utils/firebase";

export const USER_ACTION_TYPES = {
	SET_CURRENT_USER: "SET_CURRENT_USER",
	CHECK_USER_SESSION: "CHECK_USER_SESSION",
	GOOGLE_SIGN_IN_START: "GOOGLE_SIGN_IN_START",
	EMAIL_SIGN_IN_START: "EMAIL_SIGN_IN_START",
	SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
	SIGN_IN_FAILED: "SIGN_IN_FAILED",
	SIGN_UP_START: "SIGN_UP_START",
	SIGN_UP_SUCCESS: "SIGN_UP_SUCCESS",
	SIGN_UP_FAILED: "SIGN_UP_FAILED",
	SIGN_OUT_START: "SIGN_OUT_START",
	SIGN_OUT_SUCCESS: "SIGN_OUT_SUCCESS",
	SIGN_OUT_FAILED: "SIGN_OUT_FAILED",
};

const INITIAL_STATE = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return { ...state, currentUser: payload };

		case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
		case USER_ACTION_TYPES.GOOGLE_SIGN_IN_START:
			return { ...state, isLoading: true };

		case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
			return { ...state, currentUser: payload, isLoading: false };

		case USER_ACTION_TYPES.SIGN_IN_FAILED:
		case USER_ACTION_TYPES.SIGN_OUT_FAILED:
		case USER_ACTION_TYPES.SIGN_UP_FAILED:
			return { ...state, error: payload, isLoading: false };

		case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
			return { ...state, currentUser: null };

		default:
			return state;
	}
};

export function setCurrentUser(user) {
	return { type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user };
}

export function checkUserSession() {
	return { type: USER_ACTION_TYPES.CHECK_USER_SESSION };
}

export function googleSignInStart() {
	return { type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START };
}

export function emailSignInStart(email, password) {
	return { type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START, payload: { email, password } };
}

export function signInSuccess(user) {
	return { type: USER_ACTION_TYPES.SIGN_IN_SUCCESS, payload: user };
}

export function signInFailed(error) {
	return { type: USER_ACTION_TYPES.SIGN_IN_FAILED, payload: error };
}

export function signUpStart(email, password, displayName) {
	return { type: USER_ACTION_TYPES.SIGN_UP_START, payload: { email, password, displayName } };
}

export function signUpSuccess(user, additionalDetails) {
	console.log("signUpSuccess", user);
	console.log("signUpSuccess", additionalDetails);
	return { type: USER_ACTION_TYPES.SIGN_UP_SUCCESS, payload: { user, additionalDetails } };
}

export function signUpFailed(error) {
	return { type: USER_ACTION_TYPES.SIGN_UP_FAILED, payload: error };
}

export function signOutStart() {
	return { type: USER_ACTION_TYPES.SIGN_OUT_START };
}

export function signOutSuccess() {
	return { type: USER_ACTION_TYPES.SIGN_OUT_SUCCESS };
}

export function signOutFailed(error) {
	return { type: USER_ACTION_TYPES.SIGN_OUT_FAILED, error };
}

// redux-saga
// common function
export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
	try {
		const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);

		console.log("called createUserDocumentFromAuth", userSnapshot);

		yield put(signInSuccess({ id: userSnapshot, ...userSnapshot.data() }));
	} catch (error) {
		yield put(signInFailed(error));
	}
}

// onCheckUserSession
export function* isUserAuthenticated() {
	try {
		const userAuth = yield call(getCurrentUser);
		if (!userAuth) return;
		yield call(getSnapshotFromUserAuth, userAuth);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* onCheckUserSession() {
	yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

// onGoogleSignInStart
export function* signInWithGoogle() {
	try {
		const { user } = yield call(signInWithGooglePopup);
		yield call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* onGoogleSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

// onEmailSignInStart
export function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield call(signInAuthWithEmailAndPassword, email, password);
		yield call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* onEmailSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

// onSignUpStart
export function* signUp({ payload: { email, password, displayName } }) {
	try {
		const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
		console.log("signUp", user);
		console.log("signUp", { email, password, displayName });
		yield put(signUpSuccess(user, { displayName }));
	} catch (error) {
		yield put(signUpFailed(error));
	}
}

export function* onSignUpStart() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

// onSignUpSuccess
export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
	console.log("signInAfterSignUp", user);
	console.log("signInAfterSignUp", additionalDetails);
	yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onSignUpSuccess() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

// onSignOutStart
export function* signOut() {
	try {
		yield call(signOutUser);
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailed(error));
	}
}

export function* onSignOutStart() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSaga() {
	yield all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	]);
}
