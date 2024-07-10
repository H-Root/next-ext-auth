import { ENDPOINTS } from "@/lib/endpoint";

export const getProducts = (token: string) => {
	return fetch(ENDPOINTS.PRODUCTS, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
