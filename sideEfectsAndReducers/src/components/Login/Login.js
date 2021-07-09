import React, {useContext, useEffect, useReducer, useRef, useState} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/input/input";

const emailReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		return {
			value: action.value,
			isValid: state.value.includes("@"),
		};
	}
	if (action.type === "INPUT_BLUR") {
		return {
			value: state.value,
			isValid: state.value.includes("@"),
		};
	}
	return {
		value: "",
		isValid: false,
	};
};

const passwordReducer = (state, action) => {
	if (action.type === "PASSWORD_INPUT") {
		return {
			value: action.value,
			isValid: state.value.length > 6,
		};
	}
	if (action.type === "INPUT_BLUR") {
		return {
			value: state.value,
			isValid: state.value.length > 6,
		};
	}
	return {
		value: "",
		isValid: false,
	};
};

const Login = () => {
	const [formIsValid, setFormIsValid] = useState(false);

	const context = useContext(AuthContext);

	const [
		emailState,
		dispatchEmail,
	] = useReducer(
		emailReducer,
		{
			value: "",
			isValid: false,
		},
	);
	const [
		passwordState,
		dispatchPassword,
	] = useReducer(
		passwordReducer,
		{
			value: "",
			isValid: false,
		},
	);

	const {isValid: isEmailValid} = emailState;
	const {isValid: isPasswordValue} = passwordState;

	const emailRef = useRef();
	const passwordRef = useRef();

	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log("Checking form validity!");
			setFormIsValid(
				isEmailValid && isPasswordValue,
			);
		}, 500);
		return () => {
			console.log("Cleanup!");
			clearTimeout(identifier);
		};
	}, [
		isEmailValid,
		isPasswordValue,
	]);

	const emailChangeHandler = (event) => {
		dispatchEmail({
			type: "USER_INPUT",
			value: event.target.value,
		});
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({
			type: "PASSWORD_INPUT",
			value: event.target.value,
		});
	};

	const validateEmailHandler = () => {
		dispatchEmail({
			type: "INPUT_BLUR",
		});
	};

	const validatePasswordHandler = () => {
		dispatchPassword({
			type: "INPUT_BLUR",
		});
	};

	const submitHandler = (event) => {
		event.preventDefault();
		if (formIsValid) {
			context.onLogin(emailState.value, passwordState.value);
		} else if (!isEmailValid) {
			emailRef.current.focus();
		} else {
			passwordRef.current.focus();
		}
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					ref={emailRef}
					id="email"
					label="E-mail"
					type="email"
					isValid={isEmailValid}
					value={emailState.value}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
				/>
				<Input
					ref={passwordRef}
					id="password"
					label="Password"
					type="password"
					isValid={isPasswordValue}
					value={passwordState.value}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
				/>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
