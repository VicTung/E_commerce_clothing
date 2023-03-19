import styled from "styled-components";
import categories from "../../data.json";
import DirectoryItem from "../directoryItem";

function Directory() {
	return (
		<CategoriesContainer>
			{categories.map(({ title, id, imageUrl, route }) => (
				<DirectoryItem title={title} imageUrl={imageUrl} key={`directoryItem${id}`} route={route} />
			))}
		</CategoriesContainer>
	);
}

const CategoriesContainer = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

export default Directory;
