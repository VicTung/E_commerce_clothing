import { all, call } from "redux-saga/effects";
import { categoriesSaga } from "./category/categories.reducer";
import { userSaga } from "./user/user.reducer";

export function* rootSaga() {
	yield all([call(categoriesSaga), call(userSaga)]);
}
