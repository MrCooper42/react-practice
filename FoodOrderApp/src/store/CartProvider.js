import CartContext from "./cart-context";
import {useReducer} from "react";

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === "ADD") {
		const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

		const existingCartItemIndex = state.items.findIndex((item) => {
			return item.id === action.item.id;
		});
		const existingCartItem = state.items[existingCartItemIndex];

		let updatedItems;

		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	} else if (action.type === "REMOVE") {
		const existingCartItemIndex = state.items.findIndex((item) => {
			return item.id === action.id;
		});
		const itemToRemove = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount - itemToRemove.price;

		let updatedItems;

		if (itemToRemove.amount > 1) {
			const updatedItem = {
				...itemToRemove,
				amount: itemToRemove.amount - 1,
			};

			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			updatedItems = state.items.filter((item) => item.id !== action.id);
		}
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	return defaultCartState;
};

const CartProvider = (props) => {
	const [cartState, cartDispatch] = useReducer(cartReducer, defaultCartState);

	const addItem = (item) => {
		cartDispatch({
			type: "ADD",
			item,
		});
	};

	const removeItem = (id) => {
		cartDispatch({
			type: "REMOVE",
			id,
		});
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem,
		removeItem,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;