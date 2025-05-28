import React from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { DEFAULT_LIMIT } from "@/modules/constants";

interface Props {
  params: Promise<{
    slug: string;
  }>;
  searchParams:Promise<{
    minPrice:string | undefined,
    maxPrice:string | undefined;
  }>
}

const Page = async ({params, searchParams}: Props) => {
  const { slug } = await params;
  const {minPrice, maxPrice} = await searchParams;
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
    tenantSlug:slug,
    minPrice,
    maxPrice,
    limit:DEFAULT_LIMIT,
  }));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView tenantSlug={slug} narrowView/>
    </HydrationBoundary>
  );
};

export default Page;
