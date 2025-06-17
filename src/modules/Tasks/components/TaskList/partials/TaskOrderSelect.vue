<script setup lang="ts">
import Select from '../../../../../components/form/Select.vue'
import { useStore } from 'vuex'

const store = useStore()
</script>

<template>
	<Select
		:options="store.getters.getStatuses"
		:value="store.state.order"
		@update:model-value="(value) => store.commit('changeOrder', value)"
	/>
</template>