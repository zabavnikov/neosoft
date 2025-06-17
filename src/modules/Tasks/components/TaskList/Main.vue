<script setup lang="ts">
import TaskForm from './partials/TaskForm.vue'
import TaskItem from './partials/TaskItem.vue'
import { useStore } from 'vuex'
import TaskOrderSelect from './partials/TaskOrderSelect.vue'
import type { Task } from '../../../../types.ts'

const store = useStore()

store.dispatch('fetchTasks')
	.then(() => store.dispatch('fetchStatuses'))

function doChangeStatus(task: Task) {
	store.dispatch('changeTaskStatus', task)
}
function doDeleteTask(task: Task) {
	store.dispatch('deleteTask', task)
}
</script>

<template>
	<div class="task-list">
		<TaskOrderSelect />

		<ul v-if="store.getters.hasTasks" class="task-list__items">
			<TaskItem
				v-for="task in store.getters.getTasks"
				:key="task.id"
				:task="task"
				@complete="doChangeStatus"
				@delete="doDeleteTask"
			/>
		</ul>

		<p v-else>Список задач пуст</p>

		<TaskForm />
	</div>
</template>

<style lang="scss">
.task-list {
	> * + * {
		margin-top: 8px;
	}

	&__items {
		margin-bottom: 8px;

		> * + * {
			margin-top: 4px;
		}
	}
}
</style>
