import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import {useContext} from "react";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
	const cartContext = useContext(CartContext);

	const addToCartHandler = (amount) => {
		cartContext.addItem({
			id: props.id,
			name: props.name,
			price: props.price,
			amount,
		});
	};

	const price = `$${props.price.toFixed(2)}`;

	return (
		<li className={classes.meal}>
			<div><h3>{props.name}</h3></div>
			<div className={classes.description}>{props.description}</div>
			<div className={classes.price}>{price}</div>
			<MealItemForm onAddToCart={addToCartHandler}/>
		</li>
	);
};

export default MealItem;