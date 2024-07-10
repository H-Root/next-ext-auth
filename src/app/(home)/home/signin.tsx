"use client";

import { signIn } from "next-auth/react";
import React from "react";

const Sign = () => {
	signIn("credentials");
	return <div>Sign</div>;
};

export default Sign;
