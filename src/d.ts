export enum TaskStatus {
	open = "open",
	done = "done",
}

export interface ITask {
	description: string;
	dueTo: string;
	status: TaskStatus;
}
