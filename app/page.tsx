import { Catalog, Banner, Stock } from "@/shared/components";
import React from "react";


export default function Home() {
 
  return (
    <div className="mt-4 max-sm:pb-4">
      <Banner />
      <Catalog />
      <Stock />
    </div>
  );
}
