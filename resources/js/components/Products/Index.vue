<template>
	<div class="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
		<div class="min-w-full align-middle">
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
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200 divide-solid">
					<tr v-for="product in products">
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
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			products: []
		}
	},
	mounted() {
		this.getProducts()
	},
	methods: {
		getProducts() {
			axios.get('api/products')
				.then(response => this.products = response.data.data)
				.catch(error => console.log(error))
		}
	}
}
</script>