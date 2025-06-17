export type Maybe<T> = T | null | undefined

export interface Task {
	id: number
	title: string
	completed: boolean
}

export interface TaskStatus {
	label: string
	value: string
}

export interface State {
  taskId: Task['id']
  tasks: Task[]
	statuses: TaskStatus[]
  isLoading: boolean
  order: Maybe<boolean | string>
}