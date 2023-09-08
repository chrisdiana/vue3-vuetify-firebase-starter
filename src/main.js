/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Filters
import { registerFilters } from '@/plugins/filters'

const app = createApp(App)

registerPlugins(app)
registerFilters(app)

app.mount('#app')
