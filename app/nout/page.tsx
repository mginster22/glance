import { ProductsList } from "@/shared/components";
import { noutFilterFn } from "@/shared/components/libs/get-nout-filters";
import { products } from "@/shared/components/constants/products";
import React from "react";

interface Props {
  className?: string;
}
const brands = ["Apple", "HUAWEI", "Xiaomi"];
const memories = ["64GB", "128GB"];
const models = ["iPhone 14", "iPhone 12", "nova Y61", "Redmi"];
const operMemory = ["1Gb", "2Gb", "4Gb", "8Gb"];

const nout = products.filter((item) => item.name === "Ноутбук");

export default function NoutPage() {
  return (
    
    <ProductsList
      initialProducts={nout}
      filterFn={noutFilterFn}
      brands={brands}
      memories={memories}
      models={models}
      operMemory={operMemory}
    />
  );
}
