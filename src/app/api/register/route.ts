import { register } from "@/services/auth/register";
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response) {
	try {
		const { name, email, password } = await req.json();

		const response = await register({ name, email, password });

		console.log(
			"%csrc/app/api/register/route.ts:8 response",
			"color: #007acc;",
			response
		);

		return NextResponse.json({ status: 200, message: "success" });
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ message: "Something went wrong" },
			{ status: 500 }
		);
	}
}
