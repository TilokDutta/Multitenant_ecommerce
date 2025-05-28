import React from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { DEFAULT_LIMIT } from "@/modules/constants";

interface Props {
  params: Promise<{
    category: string;
  }>;
  searchParams:Promise<{
    minPrice:string | undefined,
    maxPrice:string | undefined;
  }>
}

const Category_Page = async ({params, searchParams}: Props) => {
  const { category } = await params;
  const {minPrice, maxPrice} = await searchParams;
  console.log(JSON.stringify(minPrice),"this is from rsc");

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
    category,
    minPrice,
    maxPrice,
    limit:DEFAULT_LIMIT,
  }));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView category = {category}/>
    </HydrationBoundary>
  );
};

export default Category_Page;
