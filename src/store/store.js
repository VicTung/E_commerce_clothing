import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/lib/persistReducer";
import persistStore from "redux-persist/lib/persistStore";
import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(
	{
		key: "root",
		storage,
		whitelist: ["cart"],
	},
	rootReducer
);

const middleWares = [
	process.env.NODE_ENV === "development" && logger,
	,
	// thunk
	sagaMiddleware,
].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store);
