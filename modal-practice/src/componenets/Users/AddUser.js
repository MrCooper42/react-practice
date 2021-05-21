import styles from "./AddUser.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import {useRef, useState} from "react";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
	const nameInputRef = useRef();
	const ageInputRef = useRef();

	const [error, setError] = useState();
	let isValid = true;

	const errorHandler = () => {
		setError(null);
	};

	const addUserHandler = (event) => {
		const enteredAge = ageInputRef.current.value;
		const enteredUserName = nameInputRef.current.value;
		event.preventDefault();
		if (+enteredAge < 1) {
			setError({
				title: "Invalid input",
				message: "Please provide an age greater than 0",
			});
			return;
		}
		if (+enteredAge > 100) {
			setError({
				title: "Invalid input",
				message: "Please provide an age less than 100",
			});
			return;
		}
		const user = {
			id: Math.random().toString(),
			name: enteredUserName,
			age: enteredAge,
		};
		props.onAddUser(user);
		nameInputRef.current.value = "";
		ageInputRef.current.value = "";
	};

	return (
		<Wrapper>
			<Card className={styles.input}>
				{error && <ErrorModal title={error.title} message={error.message} onClose={errorHandler}/>}
				<form onSubmit={addUserHandler}>
					<label htmlFor="username">Username</label>
					<input
						id="username"
						type="text"
						ref={nameInputRef}
					/>
					<label htmlFor="age">Age (Years)</label>
					<input
						id="age"
						type="number"
						min="0"
						ref={ageInputRef}
					/>
					<Button type="submit" disabled={!isValid}>Add User</Button>
				</form>
			</Card>
		</Wrapper>
	);
};

export default AddUser;