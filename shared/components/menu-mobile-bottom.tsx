import { AlignJustify, House, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CartDrawer } from "./ui/cart-drawer";
import { ProfilePopup } from "./profile-popup";
import { useUserStore } from "@/store/userStore";

interface Props {
  className?: string;
  active?: boolean;
  openCart?: () => void;
  cart?: any;
  profile: boolean;
  setProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuMobileBottom: React.FC<Props> = ({
  className,
  active,
  openCart,
  cart,
  profile,
  setProfile,
}) => {
  const fullname = useUserStore((state) => state.fullname);

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 flex justify-around items-center bg-white border-t border-gray-200 z-50 py-2">
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
      <div className="relative">
        <div
          className="flex flex-col items-center gap-1 cursor-pointer "
          onClick={() => setProfile((prev) => !prev)}
        >
          <UserRound />
          <span className="text-xs">{fullname ?? "Профиль"}</span>
        </div>
        {profile && <ProfilePopup onClose={() => setProfile(false)} />}
      </div>
    </div>
  );
};
