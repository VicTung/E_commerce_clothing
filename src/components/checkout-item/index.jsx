import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CartContext } from "../../contexts/cartContext";
import { addItemToCart, clearItemFromCart, removeItemFromCart, selectCartItem } from "../../store/cart/cart.reducer";

function CheckoutItem({ cartItem }) {
	const { name, imageUrl, price, quantity } = cartItem;
	// const { cartItems, addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);
	const cartItems = useSelector(selectCartItem);
	const dispatch = useDispatch();

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={`${name}`} />
			</ImageContainer>
			<Name>{name}</Name>
			<Quantity>
				<div onClick={() => dispatch(removeItemFromCart(cartItems, cartItem))}>&#10094;</div>
				<span>{quantity}</span>
				<div onClick={() => dispatch(addItemToCart(cartItems, cartItem))}>&#10095;</div>
			</Quantity>
			<Price>{price}</Price>
			<RemoveButton onClick={() => dispatch(clearItemFromCart(cartItems, cartItem))}>&#10005;</RemoveButton>
		</CheckoutItemContainer>
	);
}

const Name = styled.span`
	width: 23%;
`;

const Quantity = styled.div`
	display: flex;
	align-items: center;
	div {
		cursor: pointer;
	}
	span {
		margin: 0 10px;
	}
`;
const Price = styled.span``;

const CheckoutItemContainer = styled.div`
	width: 100%;
	display: flex;
	min-height: 100px;
	border-bottom: 1px solid darkgrey;
	padding: 15px 0;
	font-size: 20px;
	align-items: center;

	${Name},${Quantity},${Price} {
		width: 23%;
	}
`;
const ImageContainer = styled.div`
	width: 23%;
	padding-right: 15px;

	img {
		width: 100%;
		height: 100%;
	}
`;

const RemoveButton = styled.div`
	padding-left: 12px;
	cursor: pointer;
`;

export default CheckoutItem;
