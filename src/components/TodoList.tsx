import { TodoTypes } from "../types";
import axios from "axios";
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

const url = import.meta.env.VITE_BACKEND_URL;

const TodoList = () => {
	const [users, setUsers] = useState<TodoTypes[]>([]);
	const [email, setEmail] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [photo, setPhoto] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [yearOfBirth, setYearOfBirth] = useState<number>();
	console.log(users);

	const getRequest = async () => {
		const response = (await axios.get(url)).data;
		setUsers(response);
	};

	const postRequest = async () => {
		const newObj = {
			email,
			name,
			photo,
			phone,
			yearOfBirth,
		};
		const response = (await axios.post(url, newObj)).data;
		setUsers(response);
		setEmail("");
		setName("");
		setPhoto("");
		setPhone("");
		setYearOfBirth(0);
	};
	const deleteRequest = async (_id: number) => {
		const response = (await axios.delete(`${url}/${_id}`)).data;
		setUsers(response);
	};

	useEffect(() => {
		getRequest();
	}, []);

	return (
		<div>
			<h1>TodoList</h1>
			<div className="div">
				<input
					type="text"
					placeholder="Email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="Name"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="Url"
					value={photo}
					onChange={(e) => {
						setPhoto(e.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="Text"
					value={phone}
					onChange={(e) => {
						setPhone(e.target.value);
					}}
				/>
				<input
					type="number"
					placeholder="Number"
					value={yearOfBirth}
					onChange={(e) => {
						setYearOfBirth(+e.target.value);
					}}
				/>
				<button onClick={postRequest}>Add</button>
			</div>
			<TodoItem users={users} deleteRequest={deleteRequest} />
		</div>
	);
};

export default TodoList;
