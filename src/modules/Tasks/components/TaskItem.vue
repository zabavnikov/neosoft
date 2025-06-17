<script setup lang="ts">
import type { Task } from '../../../types.ts'

defineProps<{
	task: Task
}>()

const emit = defineEmits<{
	(event: 'complete', task: Task): void
	(event: 'delete', task: Task): void
}>()
</script>

<template>
	<li
		class="task-list-item"
		:class="{
			'task-list-item--completed': task.completed
		}"
	>
		<div class="task-list-item__title">{{ task.title }}</div>
		<div class="task-list-item__actions">
			<input type="checkbox" @change="emit('complete', task)" :checked="task.completed" />
			<button type="button" @click="emit('delete', task)">X</button>
		</div>
	</li>
</template>

<style lang="scss">
.task-list-item {
	display: flex;
	align-items: center;
	justify-content: space-between;

	&--completed &__title {
		text-decoration: line-through;
	}

	&__title {
		overflow: hidden;
		text-overflow: ellipsis;
		padding-right: 8px;
	}

	&__actions {
		display: flex;
		gap: 4px;
	}
}
</style>