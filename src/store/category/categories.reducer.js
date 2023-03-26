import { createSelector } from "reselect";
import { getCategoriesAndDocuments } from "../../utils/firebase";
import { takeLatest, all, call, put } from "redux-saga/effects";

export const CATEGORIES_ACTION_TYPES = {
	FETCH_CATEGORIES_START: "FETCH_CATEGORIES_START",
	FETCH_CATEGORIES_SUCCESS: "FETCH_CATEGORIES_SUCCESS",
	FETCH_CATEGORIES_FAILED: "FETCH_CATEGORIES_FAILED",
};

const INITIAL_STATE = {
	categories: [],
	isLoading: false,
	error: null,
};

export const categoriesReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
			return { ...state, isLoading: true };

		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
			return { ...state, categories: payload, isLoading: false };

		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
			return { ...state, error: payload, isLoading: false };

		default:
			return state;
	}
};

// selector
const selectCategoriesSlice = (state) => state.categories;

export const selectCategories = createSelector([selectCategoriesSlice], (categoriesSlice) => {
	console.log("selector fire 2", categoriesSlice);
	return categoriesSlice.categories;
});

export const selectCategoriesMap = createSelector([selectCategories], (categories) => {
	console.log("selector fire 3", categories);
	return categories.reduce((acc, category) => {
		const { title, items } = category;
		acc[title.toLowerCase()] = items;
		return acc;
	}, {});
});

export const selectCategoriesIsLoading = createSelector([selectCategoriesSlice], (categories) => categories.isLoading);

// action

export function fetchCategoriesStart() {
	return { type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START };
}

export function fetchCategoriesSuccess(categoriesArray) {
	return { type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, payload: categoriesArray };
}

export function fetchCategoriesFailed(error) {
	return { type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, payload: error };
}

// redux-thunk
export function fetchCategoriesAsync() {
	return async (dispatch) => {
		dispatch(fetchCategoriesStart());
		try {
			const categoriesArray = await getCategoriesAndDocuments();
			dispatch(fetchCategoriesSuccess(categoriesArray));
		} catch (error) {
			dispatch(fetchCategoriesFailed(error));
		}
	};
}

// redux-saga

export function* fetchCategoriesAsyncSaga() {
	try {
		const categoriesArray = yield call(getCategoriesAndDocuments, "categories");
		yield put(fetchCategoriesSuccess(categoriesArray));
	} catch (error) {
		yield put(fetchCategoriesFailed(error));
	}
}

export function* onFetchCategories() {
	yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsyncSaga);
}

export function* categoriesSaga() {
	yield all([call(onFetchCategories)]);
}
