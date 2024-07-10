"use client";

import React from "react";
import { Button } from "../../ui/button";
import { useSession } from "next-auth/react";
import { Loader } from "lucide-react";
import { getProducts } from "@/services/products/getProducts";

const FetchProducts = () => {
	const { data, status } = useSession();

	console.log(data, "session on client");

	if (status === "loading") {
		return (
			<div className="flex items-center justify-center">
				<Loader className="animate-spin duration-500" />
			</div>
		);
	} else if (status === "unauthenticated") {
		return (
			<div className="flex items-center justify-center">Unauthenticated</div>
		);
	}

	const handleFetch = () => {
		getProducts(data?.token as string).then((data) => {
			console.log(
				"%csrc/components/auth/FetchProducts.tsx:7 data",
				"color: #007acc;",
				data
			);
		});
	};

	return <Button onClick={handleFetch}>Fetch Products</Button>;
};

export default FetchProducts;
