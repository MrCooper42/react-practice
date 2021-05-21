import styles from "./AddUser.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import {useState} from "react";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
	const [enteredUserName, setEnteredUserName] = useState("");
	const [enteredAge, setEnteredAge] = useState("");
	const [error, setError] = useState();
	const isValid = enteredUserName.trim().length > 0 && enteredUserName.trim().length > 0;

	const userNameChangedHandler = (event) => {
		setEnteredUserName(event.target.value);
	};
	const ageChangedHandler = (event) => {
		setEnteredAge(event.target.value);
	};

	const errorHandler = () => {
		setError(null);
	};

	const addUserHandler = (event) => {
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
		setEnteredUserName("");
		setEnteredAge("");
	};

	return (
		<div>
			<Card className={styles.input}>
				{error && <ErrorModal title={error.title} message={error.message} onClose={errorHandler}/>}
				<form onSubmit={addUserHandler}>
					<label htmlFor="username">Username</label>
					<input
						id="username"
						type="text"
						value={enteredUserName}
						onChange={userNameChangedHandler}
					/>
					<label htmlFor="age">Age (Years)</label>
					<input
						id="age"
						type="number"
						value={enteredAge}
						min="0"
						onChange={ageChangedHandler}
					/>
					<Button type="submit" disabled={!isValid}>Add User</Button>
				</form>
			</Card>
		</div>
	);
};

export default AddUser;