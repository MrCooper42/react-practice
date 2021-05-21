import "./ExpenseForm.css";
import {useState} from "react";

const ExpenseForm = (props) => {
	const [enteredTitle, setEnteredTitle] = useState("");
	const [enteredAmount, setEnteredAmount] = useState("");
	const [enteredDate, setEnteredDate] = useState("");
	const [showForm, setShowForm] = useState(false);

	const titleChangeHandler = (event) => {
		setEnteredTitle(event.target.value);
	};
	const amountChangeHandler = (event) => {
		setEnteredAmount(event.target.value);
	};
	const dateChangeHandler = (event) => {
		setEnteredDate(event.target.value);
	};

	function clearForm() {
		setEnteredTitle("");
		setEnteredAmount("");
		setEnteredDate("");
	}

	const submitHandler = (event) => {
		event.preventDefault();

		const expenseData = {
			title: enteredTitle,
			amount: +enteredAmount,
			date: new Date(enteredDate),
		};

		props.onSaveExpenseData(expenseData);

		clearForm();
	};

	const isValid = enteredTitle !== "" && enteredAmount !== "" && enteredDate !== "";

	const toggleShowForm = () => {
		clearForm();
		setShowForm((prevShowForm) => {
			return !prevShowForm;
		});
	};

	if (!showForm) {
		return (
			<button type="button" onClick={toggleShowForm}>Add New Expense</button>
		);
	}

	return (
		<form onSubmit={submitHandler}>
			<div className="new-expense__controls">
				<div className="new-expense__control">
					<label>Title</label>
					<input
						type="text"
						value={enteredTitle}
						onChange={titleChangeHandler}
					/>
				</div>
				<div className="new-expense__control">
					<label>Amount</label>
					<input
						type="number"
						value={enteredAmount}
						min="0.01"
						step="0.01"
						onChange={amountChangeHandler
						}/>
				</div>
				<div className="new-expense__control">
					<label>Date</label>
					<input
						type="date"
						value={enteredDate}
						min="2019-01-01"
						max="2022-12-31"
						onChange={dateChangeHandler}
					/>
				</div>
			</div>
			<div className="new-expense__actions">
				<button type="button" onClick={toggleShowForm}>Cancel</button>
				<button type="submit" disabled={!isValid}>Add Expense</button>
			</div>
		</form>
	);
};

export default ExpenseForm;