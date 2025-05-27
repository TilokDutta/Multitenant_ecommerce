import React from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";

interface Props {
  searchParams:Promise<{
    minPrice:string | undefined,
    maxPrice:string | undefined;
  }>
}

const Category_Page = async ({searchParams}: Props) => {
  const {minPrice, maxPrice} = await searchParams;
  console.log(JSON.stringify(minPrice),"this is from rsc");

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
    minPrice,
    maxPrice,
  }));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView/>
    </HydrationBoundary>
  );
};

export default Category_Page;
