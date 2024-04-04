import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default function useProducts() {
	const products = ref({});
	const router = useRouter();
	const validationErrors = ref({});

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
		axios.post('/api/products', product)
			.then(response => {
				router.push({ name: 'products.index' })
			})
			.catch(error => {
				if (error.response?.data) {
					validationErrors.value = error.response.data.errors
				}
			});
	};

	return { products, getProducts, storeProduct, validationErrors };
}