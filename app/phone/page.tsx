import React from "react";
import {  ProductsList } from "@/shared/components";
import { phoneFilterFn } from "@/shared/components/libs/get-phone-filters";
import { products } from "@/shared/components/constants/products";

const brands = ["Apple", "HUAWEI", "Xiaomi"];
const memories = ["64GB", "128GB"];
const models = ["iPhone 14", "iPhone 12", "nova Y61", "Redmi"];

const phone = products.filter((item) => item.name === "Смартфон");
export default function PhonePage() {

  return (
    <ProductsList
      initialProducts={phone}
      filterFn={phoneFilterFn}
      brands={brands}
      memories={memories}
      models={models}
    />
  );
}
