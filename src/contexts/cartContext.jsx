import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItem: [],
	addCartItem: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	total: 0,
});

function addCartItem(cartItems, productToAdd) {
	const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

	if (existingCartItem) {
		return cartItems.map((item) => (item.id === existingCartItem.id ? { ...item, quantity: item.quantity + 1 } : item));
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }];
}

function removeCartItem(cartItems, cartItemToRemove) {
	const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

	if (existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
	}

	return cartItems.map((cartItem) => (cartItem.id === existingCartItem.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem));
}

function clearCartItem(cartItems, cartItemToClear) {
	return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		setCartCount(
			cartItems.reduce((total, cartItem) => {
				return total + cartItem.quantity;
			}, 0)
		);
	}, [cartItems]);

	useEffect(() => {
		setTotal(
			cartItems.reduce((total, cartItem) => {
				return total + cartItem.quantity * cartItem.price;
			}, 0)
		);
	}, [cartItems]);

	function addItemToCart(productToAdd) {
		setCartItems((pre) => addCartItem(pre, productToAdd));
	}

	function removeItemFromCart(cartItemToRemove) {
		setCartItems((pre) => removeCartItem(pre, cartItemToRemove));
	}

	function clearItemFromCart(cartItemToclear) {
		setCartItems((pre) => clearCartItem(pre, cartItemToclear));
	}

	return (
		<CartContext.Provider
			value={{ isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart, total }}
		>
			{children}
		</CartContext.Provider>
	);
};
