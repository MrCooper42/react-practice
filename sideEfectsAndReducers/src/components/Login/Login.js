import React, {useEffect, useReducer, useState} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

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

const Login = (props) => {
	const [formIsValid, setFormIsValid] = useState(false);

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

	const { isValid: emailIsValid } = emailState;
	const { isValid: isPasswordValue } = passwordState;

	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log("Checking form validity!");
			setFormIsValid(
				emailIsValid && isPasswordValue,
			);
		}, 500);
		return () => {
			console.log("Cleanup!");
			clearTimeout(identifier);
		};
	}, [
		emailIsValid,
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
		props.onLogin(emailState.value, passwordState.value);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						emailState.isValid === false ? classes.invalid : ""
					}`}
				>
					<label htmlFor="email">E-Mail</label>
					<input
						type="email"
						id="email"
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div
					className={`${classes.control} ${
						passwordState.isValid === false ? classes.invalid : ""
					}`}
				>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={passwordState.value}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn} disabled={!formIsValid}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
