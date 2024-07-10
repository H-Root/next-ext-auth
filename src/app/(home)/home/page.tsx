import { auth } from "@/lib/helper/auth";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import Sign from "./signin";

const page = async () => {
	const data = await auth();

	console.log("%csrc/app/(home)/home/page.tsx:7 data", "color: #007acc;", data);

	if (data == null) {
		return <Sign />;
	}

	return <div>{JSON.stringify(data)}</div>;
};

export default page;
