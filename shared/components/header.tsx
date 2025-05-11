"use client";
import React from "react";
import { Container } from "./container";
import { AlignJustify, House, ShoppingCart, UserRound } from "lucide-react";
import { cn } from "./libs";
import Link from "next/link";
import { CartDrawer } from "./ui/cart-drawer";
import { useStore } from "@/store/useProductCartStore";
import { SearchInput } from "./search-input";
import { MenuMobileBottom } from "./menu-mobile-bottom";
import { phone } from "./constants/phone";
import { nout } from "./constants/nout";
import { ProductItem } from "@/types/products";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const { cart, active, openCart } = useStore((state) => state);
  const getProducts = useStore((state) => state.getProducts);

  const allProducts: ProductItem[] = [...phone, ...nout];

  React.useEffect(() => {
    getProducts(allProducts);
  }, [getProducts]);

  return (
    <>
      <div
        className={cn(
          "border-b-1 border-[#DEDEDE] pb-6 pt-1 max-h-[200px] sticky top-0 bg-white z-50 max-sm:static",
          className
        )}
      >
        <Container className="flex justify-between items-center mt-8 max-sm:justify-center">
          <div className="flex items-center gap-30  max-sm:flex-col max-sm:gap-4  ">
            <Link href="/">
              <img src="/logo.png" />
            </Link>
            <SearchInput allProducts={allProducts} />
          </div>
          <div className="max-sm:hidden max-sm:gap-1 gap-6 items-center flex bg-white  border-gray-200 z-50 py-2">
           
            <Link href="/catalog" className="flex flex-col items-center gap-1">
              <AlignJustify />
              <span className="text-xs">Каталог</span>
            </Link>

            {active ? (
              <CartDrawer />
            ) : (
              <div
                onClick={openCart}
                className="flex flex-col items-center gap-1"
              >
                <div className="flex items-center gap-1">
                  <ShoppingCart />
                  <span className="text-gray-400 text-xs">{cart.length}</span>
                </div>
                <span className="text-xs">Корзина</span>
              </div>
            )}
            <Link href="/profile" className="flex flex-col items-center gap-1">
              <UserRound />
              <span className="text-xs">Профиль</span>
            </Link>
          </div>
        </Container>
      </div>
      <MenuMobileBottom cart={cart} active={active} openCart={openCart} />
    </>
  );
};
