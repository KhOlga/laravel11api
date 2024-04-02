import './bootstrap';

import { createApp } from 'vue';
import ProductsIndex from './components/Products/Index.vue';

createApp({})
	.component('ProductsIndex', ProductsIndex)
	.mount('#app');
