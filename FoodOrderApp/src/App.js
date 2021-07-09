import Header from "./componenets/Layout/Header";
import {Fragment, useState} from "react";
import Meals from "./componenets/Meals/Meals";
import Cart from "./componenets/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
	const [cartIsShown, setCartIsShown] = useState();

	const showCartHandler = () => {
		setCartIsShown(true);
	};
	const hideCartHandler = () => {
		setCartIsShown(false);
	};

	return (
		<CartProvider>
			{cartIsShown && <Cart onHideCart={hideCartHandler}/>}
			<Header onShowCart={showCartHandler}/>
			<main>
				<Meals/>
			</main>
		</CartProvider>
	);
}

export default App;
