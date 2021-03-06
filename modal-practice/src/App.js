import React, {useState, Fragment} from "react";
import AddUser from "./componenets/Users/AddUser";
import UsersList from "./componenets/Users/UsersList";


function App() {
	const [userList, setUserList] = useState([
		{
			id: Math.random().toString(),
			name: "Matt",
			age: 31,
		},
	]);
	const addNewUserHandler = (user) => {
		setUserList((prevUserList) => {
			return [
				...prevUserList,
				user,
			];
		});
	};

	return (
		<Fragment>
			<AddUser onAddUser={addNewUserHandler}/>
			<UsersList users={userList}/>
		</Fragment>
	);
}

export default App;
