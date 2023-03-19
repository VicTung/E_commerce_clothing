import React from "react";
import styled from "styled-components";

function CartItem({ cartItem }) {
	const { name, imageUrl, price, quantity } = cartItem;
	return (
		<CartItemContainer>
			<img src={imageUrl} alt={`${name}`} />
			<ItemDetails>
				<span>{name}</span>
				<span className="price">
					{quantity} x ${price}
				</span>
			</ItemDetails>
		</CartItemContainer>
	);
}

const CartItemContainer = styled.div`
	width: 100%;
	display: flex;
	height: 80px;
	margin-bottom: 15px;
	img {
		width: 30%;
	}
`;

const ItemDetails = styled.div`
	width: 70%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding: 10px 20px;

	span {
		font-size: 16px;
	}
`;

export default CartItem;
