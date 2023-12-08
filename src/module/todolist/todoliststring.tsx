import React, { useEffect, useState } from "react";
import "./todolist.css";

export const ToDoListString = (): JSX.Element => {
	const [task, setTask] = useState("");
	const [toDoList, setToDoList] = useState<string[]>([]);
	const [isToDoListEmpty, setIsToDoListEmpty] = useState(true);

	const addTaskToList = (): void => {
		const actualList = [...toDoList];
		actualList.push(task);
		setToDoList(actualList);
		setTask("");
	};

	useEffect(() => {
		if (toDoList.length > 0) {
			setIsToDoListEmpty(false);
		} else {
			setIsToDoListEmpty(true);
		}
	}, [toDoList]);

	const handleTaskClick = (event: any): void => {
		event.target.classList.toggle("checked");
	};

	const handleTaskDelete = (i: number): void => {
		const actualList = [...toDoList];
		actualList.splice(i, 1);
		setToDoList(actualList);
	};

	return (
		<>
			<div className="container">
				<div className="todo-app">
					<h2>ToDo List</h2>
					<input
						type="text"
						placeholder="Please insert a task"
						onChange={e => {
							setTask(e.target.value);
						}}
						value={task}
					></input>
					<input type="button" value="Add task" onClick={() => addTaskToList()}></input>
					{isToDoListEmpty && (
						<div className="empty-list">
							<i>Insert a task to start</i>
						</div>
					)}
					<ul>
						{toDoList.map((toDo, index) => (
							<>
								<li key={index} onClick={e => handleTaskClick(e)}>
									{toDo} <span onClick={() => handleTaskDelete(index)}>&#9747;</span>
								</li>
							</>
						))}
					</ul>
					{!isToDoListEmpty && <div>Amount of tasks {toDoList.length}</div>}
				</div>
			</div>
		</>
	);
};
