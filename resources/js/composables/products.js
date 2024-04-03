import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default function useProducts() {
	const products = ref({});
	const router = useRouter();

	const getProducts = async (
		page = 1,
		category = ''
	) => {
		axios.get('/api/products?page=' + page +
			'&category=' + category)
			.then(response => {
				products.value = response.data;
			})
			.catch((error) => console.log(error));
	};

	const storeProduct = async (product) => {
		axios.product('/api/products', product)
			.then(response => {
				router.push({ name: 'products.index' })
			})
	};

	return { products, getProducts, storeProduct };
}