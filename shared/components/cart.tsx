"use client";
import React from "react";
import { cn } from "./libs";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import { useStore } from "@/store/useProductCartStore";
import toast from "react-hot-toast";

interface Props {
  className?: string;
}

export const Cart: React.FC<Props> = ({ className }) => {
  const { products, cart, deleteFromCart, updateCartCount } = useStore(
    (state) => state
  );

  return (
    <div className={cn(" flex flex-col gap-4 px-2", className)}>
      {cart.map((item) => {
        const productInStore = products.find((p) => p.id === item.productId);
        const cartCount = cart
          .filter((cartItem) => cartItem.productId === item.productId)
          .reduce((acc, cur) => acc + cur.count, 0);
          const availableQuantity = productInStore?.quantity ?? 0;
        return (
          <div
            key={item.productId}
            className="flex w-full border-t-1 py-4  items-center gap-4"
          >
            <img src={item.selectedImg} className="w-[75px]" />
            <div className="flex flex-col items-start gap-2">
              <span>
                {item.name} {item.brand} {item.model}
              </span>
              <div className="flex items-center gap-3 mt-2">
                {item.discount ? (
                  <>
                    <span className="pointer-events-none select-none font-bold text-[20px]">
                      {Math.round(
                        item.price * (1 - (item.discount ?? 0) / 100)
                      )}{" "}
                      грн
                    </span>
                    <span className="pointer-events-none  select-none font-light text-[15px] line-through">
                      {item.price} грн
                    </span>
                  </>
                ) : (
                  <span className="pointer-events-none  select-none  font-bold text-[20px]">
                    {item.price} грн
                  </span>
                )}
              </div>
              <div className="flex justify-between gap-6 items-center">
                <button className="p-2 bg-[#F6F6F6] rounded-md">
                  <Heart className="mx-auto" size={20} />
                </button>
                <button
                  onClick={() => {
                    deleteFromCart(item.productId);
                    toast.success("Товар удален из корзины");
                  }}
                  className="p-2 bg-[#F6F6F6] rounded-md"
                >
                  <Trash2 className="mx-auto" size={20} />
                </button>
                <div className="border-1 border-[#750DC5] py-1 flex gap-2 justify-center items-center w-[110px]">
                  <button
                    disabled={(cartCount ?? 1) <= 1}
                    className="text-[#750DC5] disabled:opacity-50"
                    onClick={() =>
                      updateCartCount(item.productId, (cartCount ?? 1) - 1)
                    }
                  >
                    <Minus className="text-[#750DC5]" size={20} />
                  </button>
                  <span className="mx-4">{cartCount}</span>
                  <button
                    disabled={availableQuantity <= 0}
                    className="text-[#750DC5] text-[20px] disabled:opacity-50"
                    onClick={() =>
                      updateCartCount(item.productId, (cartCount ?? 1) + 1)
                    }
                  >
                    <Plus />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
