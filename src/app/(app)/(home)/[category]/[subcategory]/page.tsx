import { DEFAULT_LIMIT } from "@/modules/constants";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { SearchParams } from "nuqs/server";
import React from "react";

interface Props {
  params: Promise<{
    subcategory: string;
  }>;
  searchParams: Promise<SearchParams>;
}

export const dynamic = "force-dynamic";

const SubCategory_Page = async ({ params, searchParams }: Props) => {
  const { subcategory } = await params;
  const { rawMinPrice, rawMaxPrice } = await searchParams;
  // console.log(JSON.stringify(minPrice),"this is from rsc");
  // added this for the normalising the min and max price
  // added from chatgpt
  const normalizeParam = (
    param: string | string[] | undefined
  ): string | null => {
    if (Array.isArray(param)) return param[0] ?? null;
    return param ?? null;
  };

  const minPrice = normalizeParam(rawMinPrice);
  const maxPrice = normalizeParam(rawMaxPrice);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      category: subcategory,
      minPrice,
      maxPrice,
      limit: DEFAULT_LIMIT,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView category={subcategory} />
    </HydrationBoundary>
  );
};

export default SubCategory_Page;
