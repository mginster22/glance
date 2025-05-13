"use client";
import React from "react";
import { Container } from "./container";
import { AlignJustify, House, ShoppingCart, UserRound } from "lucide-react";
import { cn } from "./libs";
import Link from "next/link";
import { CartDrawer } from "./ui/cart-drawer";
import { useStore } from "@/store/useProductCartStore";
import { SearchInput } from "./search-input";
import { ProfilePopup } from "./profile-popup";
import { useUserStore } from "@/store/userStore";
import { products } from "./constants/products";
import { RegisterForm } from "./forms/register-form";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const fullname = useUserStore((state) => state.fullname);
  const { cart, active, openCart } = useStore((state) => state);
  const [profile, setProfile] = React.useState(false);
  const getProducts = useStore((state) => state.getProducts);

  const storeProducts = useStore((state) => state.products);
  const popupRef = React.useRef<HTMLDivElement>(null);
  const [showRegister, setShowRegister] = React.useState(false);

  React.useEffect(() => {
    const storeIds = storeProducts.map((p) => p.id).sort();
    const initialIds = products.map((p) => p.id).sort();

    const areEqual =
      storeIds.length === initialIds.length &&
      storeIds.every((id, i) => id === initialIds[i]);

    if (!areEqual) {
      getProducts(products);
    }
  }, [storeProducts, products, getProducts]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setProfile]);

  return (
    <>
      <div
        className={cn(
          "border-b-1 border-[#DEDEDE] pb-6 pt-1 max-h-[200px] sticky top-0 bg-white z-50 max-sm:static",
          className
        )}
      >
        <Container className="flex justify-between items-center mt-8 max-sm:justify-center ">
          <div className="flex items-center gap-30  max-sm:flex-col max-sm:gap-4  ">
            <Link href="/">
              <img src="/logo.png" />
            </Link>
            <SearchInput allProducts={products} />
          </div>
          <div className="max-sm:fixed max-sm:justify-center max-sm:bg-gray-100 max-sm:bottom-0 max-sm:w-full max-sm:gap-12 gap-6 items-center flex bg-gray-white  border-gray-200 z-50 py-2">
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
            <div className="relative">
              <div
                className="flex flex-col items-center gap-1 cursor-pointer"
                onClick={() => setProfile((prev) => !prev)}
              >
                <UserRound />
                <span className="text-xs">{fullname ?? "Профиль"}</span>
              </div>
              {profile && (
                <ProfilePopup
                  onClose={() => setProfile(false)}
                  setShowRegister={setShowRegister}
                  popupRef={popupRef}
                />
              )}
              {showRegister && (
                <RegisterForm onClose={() => setShowRegister(false)} />
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
