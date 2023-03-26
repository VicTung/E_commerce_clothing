import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProductCard from "../../components/productCard";
import Spinner from "../../components/spinner";
import { CategoriesContext } from "../../contexts/categoriesContext";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/category/categories.reducer";

function Category() {
	const categories = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectCategoriesIsLoading);

	const { category } = useParams();
	const [products, setProducts] = useState([]);

	useEffect(() => {
		setProducts(categories[category]);
	}, [category, categories]);

	return (
		<>
			<Title>{category.toUpperCase()}</Title>
			{isLoading ? (
				<Spinner />
			) : (
				<Container>{!!products && products.map((product) => <ProductCard key={product.id} product={product} />)}</Container>
			)}
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
