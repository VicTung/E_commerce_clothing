import { Link } from "react-router-dom";
import styled from "styled-components";
import ProductCard from "../productCard";

function CategoryPreview({ title, products }) {
	return (
		<CategoryPreviewContainer>
			<h2>
				<Title to={title}>{title.toUpperCase()}</Title>
			</h2>
			<Preview>
				{products
					.filter((_, idx) => idx < 4)
					.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</Preview>
		</CategoryPreviewContainer>
	);
}
const CategoryPreviewContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 30px;
`;

const Title = styled(Link)`
	font-size: 28px;
	margin-bottom: 25px;
	cursor: pointer;
`;

const Preview = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 20px;
`;

export default CategoryPreview;
