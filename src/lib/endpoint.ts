export const prefixUrl = (url: string) => {
	return `${process.env.NEXT_PUBLIC_BASE_URL}/${url}`;
};

export const ENDPOINTS = {
	GET_CSRF_COOKIE: prefixUrl("sanctum/csrf-cookie"),
	LOGIN: prefixUrl("api/login"),
  REGISTER: prefixUrl("api/register"),
} as const;
