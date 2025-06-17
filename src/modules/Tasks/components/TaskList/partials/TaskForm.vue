<script setup lang="ts">
import type { Task } from '../../../types.ts'
import { ref } from 'vue'
import { useStore } from 'vuex'
import InputText from '../../../../../components/form/InputText.vue'
import Button from '../../../../../components/Button.vue'

const store = useStore()
const form = ref(formInitialState())

function formInitialState(): Task {
	return {
		id: 0,
		title: '',
		completed: false,
	}
}

async function doSubmit() {
	if (store.state.isLoading) return

	try {
		await store.dispatch('addTask', form.value)
		form.value = formInitialState()
	} catch (error) {
		console.error(error)
	}
}
</script>

<template>
	<form @submit.prevent="doSubmit" class="task-form">
		<InputText
			v-model="form.title"
			placeholder="Введите название задачи"
			:loading="store.state.isLoading"
		/>

		<fieldset class="task-form__submit">
			<Button :loading="store.state.isLoading">Создать задачу</Button>
		</fieldset>
	</form>
</template>

<style lang="scss">
.task-form {
	&__submit {
		margin-top: 4px;
	}
}
</style>
