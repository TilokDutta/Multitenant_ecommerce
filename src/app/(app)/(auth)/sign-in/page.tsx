import { SignInView } from "@/modules/auth/ui/view/sign-in-view";
import { caller } from "@/trpc/server";

import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  const session = await caller.auth.session();
  if (session.user) {
    redirect("/");
  }
  return <SignInView />;
};

export default Page;
