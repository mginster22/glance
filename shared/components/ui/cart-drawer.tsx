"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "../libs";
import { Cart } from "../cart";
import { useStore } from "@/store/useProductCartStore";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<Props> = ({ className }) => {
  const { active, closeCart } = useStore((state) => state);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Закрытие при клике вне корзины
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null; // Типизация для event.target
      if (
        drawerRef.current &&
        !drawerRef.current.contains(target) &&
        !(target && target.closest(".cart-item")) // Проверяем, что target существует
      ) {
        closeCart();
      }
    };

    if (active) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active, closeCart]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0000007a] bg-opacity-40 flex justify-end">
      <div
        ref={drawerRef}
        className={cn(
          "cart-item w-[350px] h-full bg-white shadow-xl  overflow-y-auto transition-transform duration-300 ",
          className
        )}
      >
        <h2 className="text-xl font-bold mt-4 ml-5">Корзина</h2>
        <Cart />
      </div>
    </div>
  );
};
