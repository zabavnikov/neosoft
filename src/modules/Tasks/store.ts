import { createStore } from 'vuex'
import type { State, Task } from '../../types.ts'
import { useQuery } from '../../composables/useQuery.ts'
import { orderBy } from 'lodash-es'

export const store = createStore<State>({
	state() {
		return {
			taskId: 1,
			order: '',
			tasks: [],
			isLoading: false,
		}
	},
	getters: {
		/**
		 * Получаем список статусов для сортировки задач.
		 */
		getStatuses() {
			return [
				{
					value: '',
					label: 'Все',
				},
				{
					value: true,
					label: 'Выполнено',
				},
				{
					value: false,
					label: 'Активные',
				},
			]
		},

		/**
		 * Получаем список задач.
		 *
		 * @param state
		 */
		getTasks(state) {
			if (state.order !== '') {
				return orderBy(
					state.tasks,
					['completed'],
					[state.order ? 'desc' : 'asc'],
				)
			}

			return state.tasks
		},

		/**
		 * Проверяем наличие задач.
		 *
		 * @param state
		 */
		hasTasks(state) {
			return state.tasks.length > 0
		},
	},
	mutations: {
		/**
		 * Устанавливаем глобальный идентификатор дла задача.
		 *
		 * @param state
		 * @param taskId
		 */
		setTaskId(state, taskId: Task['id']) {
			state.taskId = taskId
		},

		/**
		 * Прибавляем глобальный идентификатор.
		 *
		 * @param state
		 */
		incrementTaskId(state) {
			state.taskId += 1
		},

		/**
		 * Отнимаем глобальный идентификатор.
		 *
		 * @param state
		 */
		decrementTaskId(state) {
			if (state.taskId > 0) {
				state.taskId -= 1
			}
		},

		/**
		 * Устанавливаем список задач.
		 *
		 * @param state
		 * @param payload
		 */
		setTasks(state, payload: Task[]) {
			state.tasks = payload
		},

		/**
		 * Добавляем задачу.
		 *
		 * @param state
		 * @param payload
		 */
		addTask(state, payload: Task) {
			payload.id = state.taskId
			state.tasks.unshift(payload)
		},

		/**
		 * Удаляем задачу.
		 *
		 * @param state
		 * @param payload
		 */
		deleteTask(state, payload: Task) {
			state.tasks = state.tasks.filter((task) => task.id !== payload.id)
		},

		/**
		 * Мутируем поле completed в какой-то задаче.
		 *
		 * @param state
		 * @param payload
		 */
		changeTaskStatus(state, payload: Task) {
			const taskIndex = state.tasks.findIndex((task) => task.id === payload.id)

			if (taskIndex !== -1) {
				state.tasks[taskIndex].completed = !state.tasks[taskIndex].completed
			}
		},

		/**
		 * Мутируем состояние поля order.
		 *
		 * @param state
		 * @param order
		 */
		changeOrder(state, order: State['order']) {
			state.order = order
		},

		/**
		 * Устанавливаем статус хранилища.
		 *
		 * @param state
		 * @param status
		 */
		setLoadingStatus(state, status: boolean) {
			state.isLoading = status
		},
	},
	actions: {
		/**
		 * Эмулируем запрос на бэкенд, для извлечения задач.
		 *
		 * @param context
		 */
		fetchTasks(context) {
			return new Promise((resolve) => {
				context.commit('setLoadingStatus', true)

				setTimeout(async () => {
					const tasks = await useQuery<Task[]>('tasks.json')

					// У самой первой задачи, самый высокий ID - берем его.
					context.commit('setTaskId', tasks[0].id)
					context.commit('setTasks', tasks)
					context.commit('setLoadingStatus', false)

					resolve(undefined)
				}, 500)
			})
		},

		/**
		 * Эмулируем запрос на бэкенд, для добавления задачи.
		 *
		 * @param context
		 * @param payload
		 */
		addTask(context, payload: Task) {
			return new Promise((resolve) => {
				context.commit('setLoadingStatus', true)

				setTimeout(() => {
					context.commit('incrementTaskId')
					context.commit('addTask', payload)
					context.commit('setLoadingStatus', false)

					resolve(undefined)
				}, 500)
			})
		},

		/**
		 * Эмулируем запрос на бэкенд, для удаления задачи.
		 *
		 * @param context
		 * @param payload
		 */
		deleteTask(context, payload: Task) {
			return new Promise((resolve) => {
				context.commit('setLoadingStatus', true)

				setTimeout(() => {
					context.commit('deleteTask', payload)
					context.commit('decrementTaskId')
					context.commit('setLoadingStatus', false)

					resolve(undefined)
				}, 500)
			})
		},

		/**
		 * Эмулируем запрос на бэкенд, для смены статуса задачи.
		 *
		 * @param context
		 * @param payload
		 */
		changeTaskStatus(context, payload: Task) {
			return new Promise((resolve) => {
				context.commit('setLoadingStatus', true)

				setTimeout(() => {
					context.commit('changeTaskStatus', payload)
					context.commit('setLoadingStatus', false)

					resolve(undefined)
				}, 200)
			})
		},
	},
})
