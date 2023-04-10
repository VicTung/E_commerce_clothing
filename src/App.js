import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Authentication from "./routes/authentication";
import Category from "./routes/category";
import Checkout from "./routes/checkout";
import Home from "./routes/home";
import Navigation from "./routes/navigation";
import Shop from "./routes/shop";
import { CATEGORIES_ACTION_TYPES, setCategories } from "./store/category/categories.reducer";
import { checkUserSession, setCurrentUser } from "./store/user/user.reducer";
import { createUserDocumentFromAuth, getCategoriesAndDocuments, getCurrentUser, onAuthStateChangedListener } from "./utils/firebase";

function App() {
	const dispatch = useDispatch();
	console.log('test evn', process.env)
	useEffect(() => {
		// const unsubcribe = onAuthStateChangedListener((user) => {
		// 	if (user) createUserDocumentFromAuth(user);
		// 	dispatch(setCurrentUser(user));
		// });

		// return unsubcribe;
		dispatch(checkUserSession())
	}, []);

	// add data to database
	// useEffect(() => {
	// 	addCollectionAndDocuments("categories", SHOP_DATA);
	// }, []);

	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path="shop/*" element={<Shop />} />
				<Route path="auth" element={<Authentication />} />
				<Route path="checkout" element={<Checkout />} />
			</Route>
		</Routes>
	);
}

export default App;
