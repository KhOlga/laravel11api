<template>
	<form @submit.prevent="storeProduct(product)">
		<!-- Name -->
		<div>
			<label for="product-name" class="block text-sm font-medium text-gray-700">
				Name
			</label>
			<input v-model="product.name" id="product-name" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
			<div class="text-red-600 mt-1">
				<div v-for="message in validationErrors?.name">
					{{ message }}
				</div>
			</div>
		</div>

		<!-- Description -->
		<div class="mt-4">
			<label for="product-description" class="block text-sm font-medium text-gray-700">
				Description
			</label>
			<textarea v-model="product.description" id="product-description" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
			<div class="text-red-600 mt-1">
				<div v-for="message in validationErrors?.description">
					{{ message }}
				</div>
			</div>
		</div>

		<!-- Category -->
		<div class="mt-4">
			<label for="product-category" class="block text-sm font-medium text-gray-700">
				Category
			</label>
			<select v-model="product.category_id" id="product-category" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
				<option value="" selected>-- Choose category --</option>
				<option v-for="category in categories" :value="category.id">
					{{ category.name }}
				</option>
			</select>
			<div class="text-red-600 mt-1">
				<div v-for="message in validationErrors?.category_id">
					{{ message }}
				</div>
			</div>
		</div>

		<!-- Price -->
		<div class="mt-4">
			<label for="product-price" class="block text-sm font-medium text-gray-700">
				Price
			</label>
			<input v-model="product.price" id="product-price" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
			<div class="text-red-600 mt-1">
				<div v-for="message in validationErrors.price">
					{{ message }}
				</div>
			</div>
		</div>

		<!-- Buttons -->
		<div class="mt-4">
			<button class="rounded-md bg-indigo-600 px-3 py-2 text-sm uppercase text-white">Save</button>
		</div>
	</form>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import useCategories from '@/composables/categories';
import useProducts from '@/composables/products.js';

const product = reactive({
	name: '',
	description: '',
	category_id: '',
	price: ''
});

const { categories, getCategories } = useCategories();
const { storeProduct, validationErrors } = useProducts();

onMounted(() => {
	getCategories()
})
</script>