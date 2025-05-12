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
  updateProductQuantity: (id: number, quantity: number) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: [],
      cart: [],
      active: false,
      searchTerm: "",

      // Загружаем товары в состояние
      getProducts: (incomingProducts) =>
        set((state) => ({
          products: incomingProducts.map((newProduct) => {
            const existing = state.products.find((p) => p.id === newProduct.id);
            return {
              ...newProduct,
              quantity: existing?.quantity ?? newProduct.quantity,
            };
          }),
        })),

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
      updateProductQuantity: (productId, newQuantity) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === productId
              ? { ...product, quantity: newQuantity }
              : product
          ),
        })),

      // Метод для получения корзины
      getCart: (cart) => set({ cart }),

      // Метод для добавления товара в корзину
      addToCart: (item) =>
        set((state) => {
          const updatedCart = [...state.cart];
          const existing = updatedCart.find((i) => i.productId === item.productId);
      
          if (existing) {
            existing.count += 1;
          } else {
            updatedCart.push(item);
          }
      
          const updatedProducts = state.products.map((p) =>
            p.id === item.productId
              ? { ...p, quantity: p.quantity - 1 }
              : p
          );
      
          return {
            cart: updatedCart,
            products: updatedProducts,
          };
        }),
      
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
      partialize: (state) => ({
        cart: state.cart,
        products: state.products,
        searchTerm: state.searchTerm,
      }), // сохраняем только корзину и товары
    }
  )
);

  

