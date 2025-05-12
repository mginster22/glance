import { ProductsList } from "@/shared/components";
import { nout } from "../../shared/components/constants/nout";
import { noutFilterFn } from "@/shared/components/libs/get-nout-filters";
import React from "react";

interface Props {
  className?: string;
}
const brands = ["Apple", "HUAWEI", "Xiaomi"];
const memories = ["64GB", "128GB"];
const models = ["iPhone 14", "iPhone 12", "nova Y61", "Redmi"];
const operMemory = ["1Gb", "2Gb", "4Gb", "8Gb"];

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
