import { ENDPOINTS } from "@/lib/endpoint";
import { registerSchema } from "@/lib/schema/auth/register.schema";
import { z } from "zod";

export const register = (data: z.infer<typeof registerSchema>) => {
	return fetch(ENDPOINTS.REGISTER, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
};
