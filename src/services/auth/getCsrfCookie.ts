import { ENDPOINTS } from "@/lib/endpoint";

export const getCsrfCookies = () => {
	return fetch(ENDPOINTS.GET_CSRF_COOKIE, {
		method: "GET",
	});
};
