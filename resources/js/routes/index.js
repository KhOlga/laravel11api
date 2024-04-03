import { createRouter, createWebHistory } from 'vue-router';

import ProductsIndex from '@/components/Products/Index.vue'
import ProductsCreate from '@/components/Products/Create.vue'

const routes = [
	{
		path: '/',
		name: 'products.index',
		component: ProductsIndex,
		meta: { title: 'Products Manager' }
	},
	{
		path: '/products/create',
		name: 'products.create',
		component: ProductsCreate,
		meta: { title: 'Create New Product' }
	},
]

export default createRouter({
	history: createWebHistory(),
	routes
})