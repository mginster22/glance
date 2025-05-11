import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, ProductItem } from "@/types/products";

interface StoreState {
  products: ProductItem[];
  cart: CartItem[];
  active: boolean;
  getProducts: (products: ProductItem[]) => void;
  decreaseProductQuantity: (id: number) => void;
  increaseProductQuantity: (id: number) => void;
  getCart: (cart: CartItem[]) => void;
  addToCart: (item: CartItem) => void;
  deleteFromCart: (id: number) => void;
  updateCartCount: (id: number, count: number) => void;
  openCart: () => void;
  closeCart: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: [],
      cart: [],
      active: false,
      searchTerm: "",

      // Загружаем товары в состояние
      getProducts: (products) => set({ products }),
      
      setSearchTerm: (term) => set({ searchTerm: term }),

      // Метод для уменьшения количества товара на складе
      decreaseProductQuantity: (id) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id && (product.quantity ?? 0) > 0
              ? { ...product, quantity: (product.quantity ?? 0) - 1 }
              : product
          ),
        })),

      // Метод для увеличения количества товара на складе
      increaseProductQuantity: (id) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id
              ? { ...product, quantity: (product.quantity ?? 0) + 1 }
              : product
          ),
        })),

      // Метод для получения корзины
      getCart: (cart) => set({ cart }),

      // Метод для добавления товара в корзину
      addToCart: (item) => {
        const productId = item.productId ?? item.id;
        const product = get().products.find((p) => p.id === productId);

        if (!product || (product.quantity ?? 0) <= 0) return; // Если товара нет в наличии, не добавляем его

        const existing = get().cart.find((i) => i.productId === productId);

        // Проверка доступности товара на складе
        const availableQuantity = product.quantity ?? 0;
        set((state) => {
          if (existing) {
            // Проверяем, можем ли увеличить количество товара в корзине
            const maxCount = availableQuantity;
            return {
              cart: state.cart.map((i) =>
                i.productId === productId
                  ? { ...i, count: Math.min((i.count ?? 1) + 1, maxCount) }
                  : i
              ),
            };
          } else {
            return {
              cart: [...state.cart, { ...item, productId, count: 1 }],
            };
          }
        });

        // Уменьшаем количество товара на складе
        get().decreaseProductQuantity(productId);
      },

      // Метод для удаления товара из корзины
      deleteFromCart: (id) =>
        set((state) => {
          const cartItem = state.cart.find((item) => item.productId === id);
          const updatedProducts = state.products.map((product) =>
            product.id === id && cartItem
              ? {
                  ...product,
                  quantity: (product.quantity ?? 0) + (cartItem.count ?? 1),
                }
              : product
          );

          return {
            cart: state.cart.filter((item) => item.productId !== id),
            products: updatedProducts,
          };
        }),

      // Метод для обновления количества товара в корзине
      updateCartCount: (id, newCount) =>
        set((state) => {
          const cartItem = state.cart.find((item) => item.productId === id);
          const product = state.products.find((p) => p.id === id);
          if (!cartItem || !product) return {};

          const oldCount = cartItem.count ?? 1;
          const diff = newCount - oldCount;

          // Если разница больше нуля, проверяем, достаточно ли товара на складе
          if (diff > 0 && (product.quantity ?? 0) < diff) {
            return {}; // Не обновляем количество, если товара недостаточно
          }

          const updatedProducts = state.products.map((product) => {
            if (product.id === id) {
              return {
                ...product,
                quantity: Math.max((product.quantity ?? 0) - diff, 0),
              };
            }
            return product;
          });

          const updatedCart = state.cart
            .map((item) =>
              item.productId === id
                ? { ...item, count: Math.max(newCount, 1) }
                : item
            )
            .filter((item) => (item.count ?? 0) > 0);

          return {
            cart: updatedCart,
            products: updatedProducts,
          };
        }),

      // Методы для открытия и закрытия корзины
      openCart: () => set({ active: true }),
      closeCart: () => set({ active: false }),
    }),
    {
      name: "cart-storage", // ключ в localStorage
      partialize: (state) => ({ cart: state.cart, products: state.products,searchTerm: state.searchTerm }), // сохраняем только корзину и товары
    }
  )
);
