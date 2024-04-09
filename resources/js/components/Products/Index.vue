<template>
	<div class="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
		<div class="min-w-full align-middle">
			<div class="mb-4">
				<select v-model="selectedCategory" class="block mt-1 w-full sm:w-1/4 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
					<option value="" selected>-- Filter by category --</option>
					<option v-for="category in categories" :value="category.id" :key="category.id">
						{{ category.name }}
					</option>
				</select>
			</div>
			<table class="min-w-full divide-y divide-gray-200 border">
				<thead>
					<tr>
						<th class="px-6 py-3 bg-gray-50 text-left">
							<span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</span>
						</th>
						<th class="px-6 py-3 bg-gray-50 text-left">
							<span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</span>
						</th>
						<th class="px-6 py-3 bg-gray-50 text-left">
							<span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Description</span>
						</th>
						<th class="px-6 py-3 bg-gray-50 text-left">
							<span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Category</span>
						</th>
						<th class="px-6 py-3 bg-gray-50 text-left">
							<span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Price</span>
						</th>
						<th class="px-6 py-3 bg-gray-50 text-left">
							<span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Added</span>
						</th>
						<th class="px-6 py-3 bg-gray-50 text-left">
							<span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</span>
						</th>
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200 divide-solid">
					<tr v-for="product in products.data">
						<td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
							{{ product.id }}
						</td>
						<td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
							{{ product.name }}
						</td>
						<td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
							{{ product.description }}
						</td>
						<td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
							{{ product.category.name }}
						</td>
						<td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
							{{ product.price }}
						</td>
						<td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
							{{ product.added }}
						</td>
						<td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
							<router-link :to="{ name: 'products.edit', params: { id: product.id } }">Edit</router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<TailwindPagination :data="products" @pagination-change-page="page => getProducts(page, selectedCategory)" class="mt-4" />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { TailwindPagination } from 'laravel-vue-pagination';
import useProducts from '@/composables/products.js';
import useCategories from '@/composables/categories';

const selectedCategory = ref('');
const { products, getProducts } = useProducts();
const { categories, getCategories } = useCategories();

onMounted(() => {
	getProducts()
	getCategories()
});

watch(selectedCategory, (current, previous) => {
	getProducts(1, current)
})

</script>