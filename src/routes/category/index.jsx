import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProductCard from "../../components/productCard";
import { CategoriesContext } from "../../contexts/categoriesContext";

function Category() {
	const { category } = useParams();
	const { categoriesMap } = useContext(CategoriesContext);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<>
			<Title>{category.toUpperCase()}</Title>
			<Container>{!!products && products.map((product) => <ProductCard key={product.id} product={product} />)}</Container>
		</>
	);
}

const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 20px;
	row-gap: 50px;
`;
const Title = styled.h2`
	font-size: 38px;
	margin-bottom: 25px;
	text-align: center;
`;

export default Category;
