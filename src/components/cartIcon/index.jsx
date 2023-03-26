import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ReactComponent as ShoppingSvg } from "../../assets/shopping-bag.svg";
import { selectCartCount, selectCartItem, selectIsCartOpen, setIsCartOpen } from "../../store/cart/cart.reducer";
// import { CartContext } from "../../contexts/cartContext";

const CartIcon = () => {
	const cartCount = useSelector(selectCartCount);
	const isCartOpen = useSelector(selectIsCartOpen);
	const dispatch = useDispatch();
	// const { setIsCartOpen, cartCount } = useContext(CartContext);

	return (
		<CartIconContainer onClick={() => dispatch(setIsCartOpen(!isCartOpen))}>
			<ShoppingIcon className="shopping-icon" />
			<ItemCount className="item-count">{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

const ShoppingIcon = styled(ShoppingSvg)`
	width: 24px;
	height: 24px;
`;

const CartIconContainer = styled.div`
	width: 45px;
	height: 45px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;

const ItemCount = styled.span`
	position: absolute;
	font-size: 10px;
	font-weight: bold;
	bottom: 12px;
`;

export default CartIcon;
