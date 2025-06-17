<script setup lang="ts">
import type { Maybe } from '../../types.ts'

export type Option = {
	value: unknown
	label: string
}

interface Props {
	options: Option[]
}

const { options = [] } = defineProps<Props>()

const model = defineModel<Maybe<Option['value']>>({
	default: ''
})
</script>

<template>
	<select v-model="model" class="select">
		<option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.label }}</option>
	</select>
</template>

<style>
.select {
	width: 100%;
	padding: 4px;
}
</style>