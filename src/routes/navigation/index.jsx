import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartDropdown from "../../components/cartDropdown";
import CartIcon from "../../components/cartIcon";
import { CartContext } from "../../contexts/cartContext";
import { UserContext } from "../../contexts/UserContext";
import { selectCartTotal, selectIsCartOpen } from "../../store/cart/cart.reducer";
import { signOutStart } from "../../store/user/user.reducer";
import { signOutUser } from "../../utils/firebase";

function Navigation() {
	const dispatch = useDispatch();

	const currentUser = useSelector((state) => state.user.currentUser);
	// const currentUser = useContext(UserContext);
	// const { isCartOpen } = useContext(CartContext);
	const isCartOpen = useSelector(selectIsCartOpen);

	return (
		<>
			<NavigationContainer>
				<LogoContainer to="/">
					<CrwnLogo className="logo" />
				</LogoContainer>
				<NavLinks>
					<NavLink to="/shop">Shop</NavLink>
					{currentUser ? (
						<NavLink
							as="span"
							onClick={() => {
								signOutUser()
								dispatch(signOutStart());
							}}
						>
							SIGN OUT
						</NavLink>
					) : (
						<NavLink to="/auth">SignIn</NavLink>
					)}
					<CartIcon />
				</NavLinks>
				{isCartOpen && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</>
	);
}

const NavigationContainer = styled.div`
	height: 70px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-bottom: 25px;
`;

const LogoContainer = styled(Link)`
	height: 100%;
	width: 70px;
	padding: 25px;
`;

const NavLinks = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const NavLink = styled(Link)`
	padding: 10px 15px;
	cursor: pointer;
`;

export default Navigation;
