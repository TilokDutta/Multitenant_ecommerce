"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useProductFilters } from "../../hooks/use-products-filters";
import { ProductCard, ProductCardSkeleton } from "./product-card";
import { DEFAULT_LIMIT } from "@/modules/constants";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "lucide-react";

interface Props {
  category?: string;
}

export const ProductList = ({ category }: Props) => {
  const [filters] = useProductFilters();
  const trpc = useTRPC();
  const { 
    data, 
    hasNextPage, 
    isFetchingNextPage, 
    fetchNextPage 
  } = useSuspenseInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions(
      {
        category,
        ...filters,
        limit:DEFAULT_LIMIT,
      },
      {
        getNextPageParam:(lastPage) => {
          return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
        },
      }
    ),
  );

  if (data.pages?.[0]?.docs.length === 0){
    return(
      <div className="border border-black border-dashed flex items-center justidy-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
        <InboxIcon/>
        <p className="text-base font-medium"> No Products found.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid:cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {data?.pages.flatMap((page) => page.docs).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.image?.url}
            authorUsername={product.tenant.name}
            authorImageUrl={undefined}
            price={product.price}
            reviewRating={3}
            reviewCount={5.0}
          />
        ))}
      </div>
      <div className="flex justify-center pt-8">
        {hasNextPage && (
          <Button
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="font-medium disabled:opacity-50 text-base bg-white"
            variant="elevated"
          >
            Load More
          </Button>
        )}
      </div>
    </>
    
  );
};

export const ProductListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid:cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {Array.from({length: DEFAULT_LIMIT}).map((_,index) =>(
        <ProductCardSkeleton key={index}/>
      ))}
    </div>
    );
};
