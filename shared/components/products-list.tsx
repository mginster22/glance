"use client";

import React, { useEffect } from "react";
import { Container, Products, SearchFilters } from "@/shared/components";
import { Filters, useFilters } from "@/shared/hooks/use-filters";
import { useStore } from "@/store/useProductCartStore";
import { ProductItem } from "@/types/products";

interface Props {
  initialProducts: ProductItem[];
  filterFn: (item: ProductItem, filters: Filters) => boolean;
  brands: string[];
  memories: string[];
  models: string[];
  operMemory?: string[];
  className?: string;
}

export const ProductsList: React.FC<Props> = ({
  initialProducts,
  filterFn,
  brands,
  memories,
  models,
  operMemory,
}) => {
  const { products, getProducts } = useStore((state) => state);

  useEffect(() => {
    getProducts(initialProducts);
  }, [getProducts, initialProducts]);

  const {
    filters,
    handleCheckboxChange,
    handlePriceChange,
    filteredData,
  } = useFilters(products, filterFn);

  return (
    <div className="min-h-screen flex flex-col">
      <Container className="flex gap-6 grow">
        <SearchFilters
          filters={filters}
          brands={brands}
          memories={memories}
          models={models}
          operMemory={operMemory}
          onChange={handleCheckboxChange}
          onPriceChange={handlePriceChange}
        />
        <Products
          products={filteredData}
          productMobileClassCart={true}
          className="grow"
        />
      </Container>
    </div>
  );
};
