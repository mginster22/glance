
import React from "react";
import { ProductsList } from "@/shared/components";
import { phone } from "@/shared/components/constants/phone";
import { phoneFilterFn } from "@/shared/components/libs/get-phone-filters";


const brands = ["Apple", "HUAWEI", "Xiaomi"];
const memories = ["64GB", "128GB"];
const models = ["iPhone 14", "iPhone 12", "nova Y61", "Redmi"];

const PhonePage: React.FC = () => {
  
  return (
    <ProductsList
      initialProducts={phone}
      filterFn={phoneFilterFn} 
      brands={brands}
      memories={memories}
      models={models}
    />
  );
};

export default PhonePage;
