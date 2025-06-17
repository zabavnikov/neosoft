<script setup lang="ts">
import TaskForm from './TaskForm.vue'
import TaskItem from './TaskItem.vue'
import { useStore } from 'vuex'
import TaskOrderSelect from './TaskOrderSelect.vue'

const store = useStore()

store.dispatch('fetchTasks')
</script>

<template>
	<div class="task-list">
		<TaskOrderSelect />

		<ul v-if="store.getters.hasTasks" class="task-list__items">
			<TaskItem
				v-for="task in store.getters.getTasks"
				:key="task.id"
				:task="task"
				@complete="store.dispatch('changeTaskStatus', task)"
				@delete="store.dispatch('deleteTask', task)"
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
