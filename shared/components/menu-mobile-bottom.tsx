import { AlignJustify, House, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CartDrawer } from "./ui/cart-drawer";
import { Container } from "./container";

interface Props {
  className?: string;
  active?: boolean;
  openCart?: () => void;
  cart?: any;
}

export const MenuMobileBottom: React.FC<Props> = ({
  className,
  active,
  openCart,
  cart,
}) => {
  return (
    <div className="sm:hidden fixed bottom-55 left-0 right-0 flex justify-around items-center bg-white border-t border-gray-200 z-50 py-2">
      <Link href="/" className=" flex flex-col items-center gap-1">
        <House className="" />
        <span className="text-xs ">Главная</span>
      </Link>
      <Link href="/catalog" className="flex flex-col items-center gap-1">
        <AlignJustify />
        <span className="text-xs">Каталог</span>
      </Link>
      {active ? (
        <CartDrawer />
      ) : (
        <div onClick={openCart} className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            <ShoppingCart />
            <span className="text-gray-400 text-xs">{cart.length}</span>
          </div>
          <span className="text-xs">Корзина</span>
        </div>
      )}
      <Link href="/" className="flex flex-col items-center gap-1">
        <UserRound />
        <span className="text-xs">Профиль</span>
      </Link>
    </div>
  );
};
