export type Maybe<T> = T | null | undefined

export interface Task {
	id: number
	title: string
	completed: boolean
}

export interface State {
  taskId: Task['id']
  tasks: Task[]
  isLoading: boolean
  order: Maybe<boolean | string>
}