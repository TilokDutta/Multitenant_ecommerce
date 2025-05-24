"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useProductFilters } from "../../hooks/use-products-filters";

export const ProductSort = () => {
  const [filters, setFilters] = useProductFilters();

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "curated" &&
            "bg-transparent border-transparent hover:border-border hover:bg-white"
        )}
        variant="secondary"
        onClick={() => setFilters({ sort: "curated" })}
      >
        curated
      </Button>
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "trending" &&
            "bg-transparent border-transparent hover:border-border hover:bg-white"
        )}
        variant="secondary"
        onClick={() => setFilters({ sort: "trending" })}
      >
        Trending
      </Button>
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "hot&new" &&
            "bg-transparent border-transparent hover:border-border hover:bg-white"
        )}
        variant="secondary"
        onClick={() => setFilters({ sort: "hot&new" })}
      >
        Hot&New
      </Button>
    </div>
  );
};
