import React, { useEffect, useState } from "react";
import "./todolist.css";

enum TaskStatus {
	open = "open",
	done = "done",
}

interface ITask {
	description: string;
	status: TaskStatus;
}

export const ToDoListType = (): JSX.Element => {
	const taskDefault: ITask = { description: "", status: TaskStatus.open };
	const [task, setTask] = useState<ITask>(taskDefault);
	const [toDoList, setToDoList] = useState<ITask[]>([]);
	const [isToDoListEmpty, setIsToDoListEmpty] = useState(true);

	const addTaskToList = (): void => {
		const actualList = [...toDoList];
		actualList.push(task);
		setToDoList(actualList);
		setTask(taskDefault);
	};

	useEffect(() => {
		if (toDoList.length > 0) {
			setIsToDoListEmpty(false);
		} else {
			setIsToDoListEmpty(true);
		}
	}, [toDoList]);

	const handleTaskClick = (index: number): void => {
		const copyOfToDoList = [...toDoList];
		const clickedTask = copyOfToDoList[index];
		if (clickedTask.status === TaskStatus.open) {
			clickedTask.status = TaskStatus.done;
		} else {
			clickedTask.status = TaskStatus.open;
		}
		[...toDoList][index] = clickedTask;
		setToDoList(copyOfToDoList);
	};

	const handleTaskDelete = (i: number): void => {
		const copyOfToDoList = [...toDoList];
		copyOfToDoList.splice(i, 1);
		setToDoList(copyOfToDoList);
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
							setTask({ ...task, description: e.target.value });
						}}
						value={task.description}
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
								<li className={toDo.status} key={index} onClick={() => handleTaskClick(index)}>
									{toDo.description} <span onClick={() => handleTaskDelete(index)}>&#9747;</span>
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
