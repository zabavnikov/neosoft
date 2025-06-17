import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { store } from './modules/Tasks/store.ts'

createApp(App)
	.use(store)
	.mount('#app')
