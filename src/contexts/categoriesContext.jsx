import { createContext, useEffect, useState } from "react";
// import SHOP_DATA from "../shop-data";
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase";

export const CategoriesContext = createContext({
	categoriesMap: {},
});
// export const SetCurrentUserContext = createContext(() => null);

export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setCategoriesMap] = useState({});

	useEffect(() => {
		(async () => {
			const reponse = await getCategoriesAndDocuments();
			setCategoriesMap(reponse);
		})();
		// addCollectionAndDocuments("categories", SHOP_DATA);
	}, []);

	// add data to database
	// useEffect(() => {
	// 	addCollectionAndDocuments("categories", SHOP_DATA);
	// }, []);

	return <CategoriesContext.Provider value={{ categoriesMap }}>{children}</CategoriesContext.Provider>;
};
