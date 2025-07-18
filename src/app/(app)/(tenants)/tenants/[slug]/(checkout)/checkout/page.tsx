import { CheckoutView } from "@/modules/checkout/ui/views/checkout-view";
import React from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  return <CheckoutView tenantSlug={slug} />;
};

export default Page;
