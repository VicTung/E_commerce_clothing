import { Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CategoryPreview from "../../components/category-preview";
import Spinner from "../../components/spinner";
import { CategoriesContext } from "../../contexts/categoriesContext";
import { selectCategories, selectCategoriesIsLoading, selectCategoriesMap } from "../../store/category/categories.reducer";

function CategoriesPreview() {
	const categories = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectCategoriesIsLoading);
	// const { categoriesMap } = useContext(CategoriesContext);
	return (
		<Container>
			{isLoading ? (
				<Spinner />
			) : (
				Object.keys(categories).map((title) => {
					const products = categories[title];

					return <CategoryPreview key={title} products={products} title={title} />;
				})
			)}
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

export default CategoriesPreview;
