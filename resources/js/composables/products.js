import { ref } from 'vue';

export default function useProducts() {
	const products = ref({});

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

	return { products, getProducts };
}