import Button, { BaseButton, GoogleSignInButton, InvertedButton } from "../button";
import { useContext } from "react";
// import { CartContext } from "../../contexts/cartContext";
import CartItem from "../cartItem";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectCartItem } from "../../store/cart/cart.reducer";

function CartDropdown() {
	const cartItems = useSelector(selectCartItem)
	// const { cartItems } = useContext(CartContext);
	const navigation = useNavigate();

	return (
		<CartDropdownContainer>
			{cartItems.length ? (
				<CartItems>
					{cartItems.map((item) => (
						<CartItem key={item.id} cartItem={item} />
					))}
				</CartItems>
			) : (
				<EmptyMessage>Your cart is empty</EmptyMessage>
			)}

			<Button onClick={() => navigation("/checkout")}>Go To Checkout</Button>
		</CartDropdownContainer>
	);
}

const CartDropdownContainer = styled.div`
	position: absolute;
	width: 240px;
	height: 340px;
	display: flex;
	flex-direction: column;
	padding: 20px;
	border: 1px solid black;
	background-color: white;
	top: 90px;
	right: 40px;
	z-index: 5;

	${BaseButton},
	${GoogleSignInButton},
	${InvertedButton} {
		margin-top: auto;
	}
`;

const EmptyMessage = styled.span`
	font-size: 18px;
	margin: 50px auto;
`;

const CartItems = styled.div`
	height: 240px;
	display: flex;
	flex-direction: column;
	overflow: scroll;
`;

export default CartDropdown;
