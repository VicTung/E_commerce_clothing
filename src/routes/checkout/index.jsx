import { useContext } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CheckoutItem from "../../components/checkout-item";
import PaymentForm from "../../components/payment-form";
import { CartContext } from "../../contexts/cartContext";
import { selectCartItem, selectCartTotal } from "../../store/cart/cart.reducer";

function Checkout() {
	// const { cartItems, total } = useContext(CartContext);
	const cartItems = useSelector(selectCartItem);
	const total = useSelector(selectCartTotal);

	return (
		<>
			<Container>
				<Header>
					<Block>
						<span>Product</span>
					</Block>
					<Block>
						<span>Description</span>
					</Block>
					<Block>
						<span>Quantity</span>
					</Block>
					<Block>
						<span>Price</span>
					</Block>
					<Block>
						<span>Remove</span>
					</Block>
				</Header>
				{cartItems.map((cartItem) => {
					return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
				})}
				<Total>Total: ${total}</Total>
				<PaymentForm />
			</Container>
		</>
	);
}

const Container = styled.div`
	width: 55%;
	min-height: 90vh;
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	margin: 50px auto 0;
`;

const Header = styled.div`
	width: 100%;
	padding: 10px 0;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid darkgrey;
`;

const Block = styled.div`
	text-transform: capitalize;
	width: 23%;
	&:last-child {
		width: 8%;
	}
`;

const Total = styled.span`
	margin-top: 30px;
	margin-left: auto;
	font-size: 36px;
`;
export default Checkout;
