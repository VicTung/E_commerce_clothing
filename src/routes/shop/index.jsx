import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { fetchCategoriesAsync, fetchCategoriesStart, setCategories } from "../../store/category/categories.reducer";
import { getCategoriesAndDocuments } from "../../utils/firebase";
import CategoriesPreview from "../categoriesPreview";
import Category from "../category";

function Shop() {
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			// dispatch(fetchCategoriesAsync()); // redux-thunk
			dispatch(fetchCategoriesStart()); // redux-thunk

		})();
	}, []);

	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=":category" element={<Category />} />
		</Routes>
	);
}

export default Shop;
