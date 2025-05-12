"use client";
import React from "react";
import { Products } from "./products";
import { Container } from "./container";
import { Title } from "./ui";
import { cn } from "./libs";
import { useStore } from "@/store/useProductCartStore";


interface Props {
  className?: string;
}

export const Stock: React.FC<Props> = ({ className }) => {
  const { products } = useStore((state) => state);
 
  const discountPhone = products.filter((product) => product.discount);
    
  return (
    <div className={cn("relative mt-4", className)}>
      <Container>
        <Title text="Акции" size="md" />
        <Products useSwiper={true} products={discountPhone} />
      </Container>
    </div>
  );
};
