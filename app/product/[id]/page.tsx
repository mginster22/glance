"use client";
import React, { use } from "react";
import { useParams } from "next/navigation";
import { useStore } from "@/store/useProductCartStore";
import { Button, Title } from "@/shared/components/ui";
import { Container } from "@/shared/components";
import { cn } from "@/shared/components/libs";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";



export default function ProductPage ( )  {
  const { addToCart } = useStore((state) => state);
  const { products } = useStore((state) => state);
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === String(id));

  if (!product || products.length === 0) {
    return (
      <Container className={cn("mt-4",)}>
        <Title text="Загрузка товара..." size="md" />
      </Container>
    );
  }
  console.log("products", products);
  console.log("id", id);
  console.log("найденный продукт", product);
  return (
    <Container
      className={cn("mt-4 flex flex-col  max-sm:pb-40 max-sm:px-4")}
    >
      <Title text="Карточка товара" size="md" />
      <div className="flex justify-between max-sm:flex-col">
        <img
          src={product.img[0]}
          className="w-[400px] h-[500px] object-contain max-sm:w-[200px] max-sm:h-[200px]"
        />
        <div className="w-[350px]">
          <div className="text-[32px]">
            <p className="max-sm:text-[20px]">
              {product.name} {product.brand} {product.model} {product.memory}
            </p>
          </div>
          <span className="font-light">Цвет белый</span>
          <div className="flex flex-col text-xl max-sm:text-sm max-sm:gap-3 gap-9">
            <span className="text-2xl ">Характеристики:</span>
            <p className=" font-light">
              Экран: _____ {product.characteristic.screen}
            </p>
            <p className="font-light">
              Количество ядер: ____ {product.characteristic.cores}
            </p>
            <p className=" font-light">
              Мощность блока питания: ___ {product.characteristic.power}
            </p>
            <p className=" font-light">
              Оперативная память (RAM): ___ {product.characteristic.ram}
            </p>
            <p className=" font-light">
              Встроенная память (ROM): ____ {product.characteristic.rom}
            </p>
            <p className=" font-light">
              Основная камера МПикс: ____ {product.characteristic.camera}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center  bg-[#E7E7ED] max-w-[300px] w-full max-h-[200px] py-8">
          <div className="flex  items-end gap-2 ">
            {product.discount ? (
              <>
                <span className="font-bold text-[20px]">
                  {Math.round(
                    product.price * (1 - (product.discount ?? 0) / 100)
                  )}{" "}
                  грн
                </span>
                <span className="font-light text-[15px] line-through">
                  {product.price} грн
                </span>
              </>
            ) : (
              <span className="font-bold  text-[20px] ">
                {product.price} грн
              </span>
            )}
          </div>

          <Button
            onClick={() => {
              addToCart({
                ...product,
                productId: product.id,
                count: 1,
                selectedImg: product.img[0],
              });
              // setTimeout(() => setShowToast(false), 2000); // скрыть через 2 секунды
              toast.success("Товар добавлен в корзину");
            }}
            disabled={(product.quantity ?? 0) === 0}
            text="Добавить в корзину"
            className="px-8 rounded-md "
          />
          <div className="  ">
            {(product.quantity ?? 0) > 0 ? (
              <span className="text-[#169B00] text-[16px]">В наличии</span>
            ) : (
              <span className="text-red-400 text-[16px]">Товар закончился</span>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

