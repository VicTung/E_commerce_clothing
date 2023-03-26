import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CartContext } from "../../contexts/cartContext";
import { addItemToCart, selectCartItem } from "../../store/cart/cart.reducer";
import Button, { BUTTON_TYPE_CLASSES } from "../button";

const ProductCard = ({ product }) => {
	const { name, imageUrl, price } = product;
	// const { addItemToCart } = useContext(CartContext);
	const cartItems = useSelector(selectCartItem);
	const dispatch = useDispatch();

	return (
		<ProductCardContainer>
			<img src={imageUrl} alt={`${name}`} />
			<Footer>
				<Name>{name}</Name>
				<Price>{price}</Price>
			</Footer>
			<Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={() => dispatch(addItemToCart(cartItems, product))}>
				Add to card
			</Button>
		</ProductCardContainer>
	);
};

const ProductCardContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	height: 350px;
	align-items: center;
	position: relative;

	img {
		width: 100%;
		height: 95%;
		object-fit: cover;
		margin-bottom: 5px;
	}

	button {
		width: 80%;
		opacity: 0.7;
		position: absolute;
		top: 255px;
		display: none;
	}

	&:hover {
		img {
			opacity: 0.8;
		}

		button {
			opacity: 0.85;
			display: flex;
		}
	}
`;

const Name = styled.span`
	width: 90%;
	margin-bottom: 15px;
`;

const Price = styled.span`
	width: 10%;
`;

const Footer = styled.div`
	width: 100%;
	height: 5%;
	display: flex;
	justify-content: space-between;
	font-size: 18px;

	.name {
		width: 90%;
		margin-bottom: 15px;
	}

	.price {
		width: 10%;
	}
`;

export default ProductCard;
