import React, { useState } from "react";
import { Button, Input } from "antd";
import "./todolist.css";
import { observer } from "mobx-react-lite";
import { ToDoStore } from "../../store/todostore";
import { ITask, TaskStatus } from "../../d";

export const ToDoList = observer(() => {
	const [task, setTask] = useState<ITask>({ description: "", dueTo: "", status: TaskStatus.open });

	const handleAddTaskClick = (): void => {
		if (task.description !== "" && task.dueTo !== "") {
			ToDoStore.addTaskToList(task);
			resetInputs();
		} else {
			alert("Please type in a description and a due to date");
		}
	};

	const resetInputs = (): void => {
		task.description = "";
		task.dueTo = "";
	};
	return (
		<>
			<div className="container">
				<div className="todo-app">
					<h2>ToDo List</h2>
					<Input
						type="text"
						placeholder="Please insert a task"
						onChange={event => {
							setTask({ ...task, description: event.target.value });
						}}
						value={task.description}
					></Input>
					<Input
						type="date"
						onChange={event => {
							setTask({ ...task, dueTo: event.target.value });
						}}
						value={task.dueTo}
					></Input>
					<Button type="primary" onClick={() => handleAddTaskClick()}>
						Add Task
					</Button>
					{ToDoStore.isToDoListEmpty && (
						<div className="empty-list">
							<i>Insert a task to start</i>
						</div>
					)}
					<ul>
						{ToDoStore.toDoList.map((toDo, index) => (
							<>
								<li className={toDo.status} key={index} onClick={() => ToDoStore.handleClickTask(index)}>
									{toDo.description} - due to: {toDo.dueTo} <span>&#9747;</span>
								</li>
							</>
						))}
					</ul>
					{!ToDoStore.isToDoListEmpty && <p>Amount of ToDos: {ToDoStore.amountOfOpenToDos}</p>}
				</div>
			</div>
		</>
	);
});
