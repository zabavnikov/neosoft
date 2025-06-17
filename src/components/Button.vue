<script setup lang="ts">
interface Props {
	type?: 'submit' | 'reset' | 'button'
	loading?: boolean
}

const { type = 'submit' } = defineProps<Props>()
</script>

<template>
	<div class="button">
		<button :type="type" :disabled="loading">
			<slot />
		</button>
		<div v-show="loading" class="button__loading"></div>
	</div>
</template>

<style>
.button {
	position: relative;
}

.button__loading {
	position: absolute;
	inset: 0;
	background-color: rgba(0, 0, 0, 0.4);
}

.button button {
	padding: 4px;
	width: 100%;
}
</style>
