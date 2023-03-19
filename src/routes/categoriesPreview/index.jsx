import { Fragment, useContext } from "react";
import styled from "styled-components";
import CategoryPreview from "../../components/category-preview";
import { CategoriesContext } from "../../contexts/categoriesContext";

function CategoriesPreview() {
	const { categoriesMap } = useContext(CategoriesContext);
	return (
		<Container>
			{Object.keys(categoriesMap).map((title) => {
				const products = categoriesMap[title];

				return <CategoryPreview key={title} products={products} title={title} />;
			})}
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

export default CategoriesPreview;
