import { createSelector } from "reselect";

export const CART_ACTION_TYPES = {
	SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
	SET_CART_ITEMS: "SET_CART_ITEMS",
	SET_CART_COUNT: "SET_CART_COUNT",
	SET_CART_TOTAL: "SET_CART_TOTAL",
};

const INITIAL_STATE = {
	isCartOpen: false,
	cartItem: [],
};

export const cartReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return { ...state, cartItem: payload };

		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return { ...state, isCartOpen: payload };

		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return { ...state, cartItem: payload };

		default:
			return state;
	}
};

// selector
const selectCartSlice = (state) => state.cart;

export const selectCartItem = createSelector([selectCartSlice], (cart) => cart.cartItem);

export const selectIsCartOpen = createSelector([selectCartSlice], (cart) => cart.isCartOpen);

export const selectCartCount = createSelector([selectCartItem], (cartItem) =>
	cartItem.reduce((total, cartItem) => {
		return total + cartItem.quantity;
	}, 0)
);

export const selectCartTotal = createSelector([selectCartItem], (cartItem) =>
	cartItem.reduce((total, cartItem) => {
		return total + cartItem.quantity * cartItem.price;
	}, 0)
);

// action
export function setIsCartOpen(payload) {
	return { type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload };
}

export function addItemToCart(cartItem, productToAdd) {
	return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: addCartItem(cartItem, productToAdd) };
}

export function removeItemFromCart(cartItem, cartItemToRemove) {
	return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: removeCartItem(cartItem, cartItemToRemove) };
}

export function clearItemFromCart(cartItem, cartItemToclear) {
	return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: clearCartItem(cartItem, cartItemToclear) };
}

// helper function

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
