import { makeAutoObservable } from "mobx";
import { ITask, TaskStatus } from "../d";

export class Store {
	private _toDoList: ITask[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	get amountOfOpenToDos(): number {
		const openToDos = this._toDoList.filter(todo => todo.status === TaskStatus.open);
		return openToDos.length;
	}

	get isToDoListEmpty(): boolean {
		return this._toDoList.length > 0 ? false : true;
	}

	get toDoList(): ITask[] {
		return this._toDoList;
	}
	set toDoList(value: ITask[]) {
		this._toDoList = value;
	}

	public addTaskToList(task: ITask): void {
		this.toDoList.push(task);
	}

	public handleClickTask(index: number): void {
		const clickedTask = this.toDoList[index];
		if (clickedTask.status === TaskStatus.open) {
			clickedTask.status = TaskStatus.done;
		} else {
			clickedTask.status = TaskStatus.open;
		}
	}
}

export const ToDoStore = new Store();
