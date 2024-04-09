import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

export default function useProducts() {
	const products = ref({});
	const product = ref({});
	const router = useRouter();
	const validationErrors = ref({});
	const isLoading = ref(false);
	const swal = inject('$swal');

	const getProducts = async (
		page = 1,
		category = ''
	) => {
		axios.get('/api/products?page=' + page +
			'&category=' + category)
			.then(response => {
				products.value = response.data;
			})
	};

	const getProduct = async (id) => {
		axios.get('/api/products/' + id)
			.then(response => {
				product.value = response.data.data;
			})
	};

	const storeProduct = async (product) => {
		if (isLoading.value) return;

		isLoading.value = true;
		validationErrors.value = {};

		let serializedProduct = new FormData();
		for (let item in product) {
			if (product.hasOwnProperty(item)) {
				serializedProduct.append(item, product[item]);
			}
		}

		axios.post('/api/products', serializedProduct)
			.then(response => {
				router.push({ name: 'products.index' });
				swal({
					icon: 'success',
					title: 'Product created successfully'
				});
			})
			.catch(error => {
				if (error.response?.data) {
					validationErrors.value = error.response.data.errors;
					isLoading.value = false;
				}
			});
	};

	const updateProduct = async (product) => {
		if (isLoading.value) return;

		isLoading.value = true;
		validationErrors.value = {};

		let serializedProduct = new FormData();
		for (let item in product) {
			if(product.hasOwnProperty(item)) {
				serializedProduct.append(item, product[item]);
			}
		}

		axios.put('/api/products/' + product.id, serializedProduct)
			.then(response => {
				router.push({ name: 'products.index' });
				swal({
					icon: 'success',
					title: 'Product updated successfully'
				});
			})
			.catch(error => {
				if (error.response?.data) {
					validationErrors.value = error.response.data.errors
				}
			})
			.finally(() => isLoading.value = false)
	};

	return { products, product, getProducts, getProduct, storeProduct, updateProduct, validationErrors, isLoading };
}