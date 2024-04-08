import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default function useProducts() {
	const products = ref({});
	const router = useRouter();
	const validationErrors = ref({});
	const isLoading = ref(false);

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

	const storeProduct = async (product) => {
		if (isLoading.value) return;

		isLoading.value = true;
		validationErrors.value = {};

		let serializedProduct = new FormData();
		for (let item in product) {
			if(product.hasOwnProperty(item)) {
				serializedProduct.append(item, product[item]);
			}
		}

		axios.post('/api/products', serializedProduct)
			.then(response => {
				router.push({ name: 'products.index' });
			})
			.catch(error => {
				if (error.response?.data) {
					validationErrors.value = error.response.data.errors;
					isLoading.value = false;
				}
			});
	};

	return { products, getProducts, storeProduct, validationErrors, isLoading };
}