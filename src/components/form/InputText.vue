<script setup lang="ts">
interface Props {
	placeholder?: string
	loading?: boolean
}

const { placeholder = 'Введите текст' } = defineProps<Props>()

const model = defineModel({
	default: '',
})
</script>

<template>
	<div class="input-text">
		<input
			v-model="model"
			:placeholder="placeholder"
			:disabled="loading"
			type="text"
			required
		/>
		<div v-show="loading" class="input-text__loading"></div>
	</div>
</template>

<style>
.input-text {
	position: relative;
}

.input-text__loading {
	position: absolute;
	inset: 0;
	background-color: rgba(0, 0, 0, 0.4);
}

.input-text input {
	width: 100%;
	padding: 4px;
}
</style>
