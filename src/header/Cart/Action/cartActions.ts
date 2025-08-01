
import type { Product } from "../../../body/Home/Request/SetAllproducts";
import { getCartFromStorage, saveCartToStorage } from "../Request/cartRequest";

export const addToCartLocal = (product: Product) => {
  const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
  const updatedCart = [...existingCart, product];
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

export const getCartDetails = async (): Promise<Product[]> => {
  return getCartFromStorage();
};

export const addToCart = (product: Product) => {
  const cart = getCartFromStorage();
  const updated = [...cart, product];
  saveCartToStorage(updated);
};

export const removeFromCart = (id: number) => {
  const cart = getCartFromStorage();
  const updated = cart.filter((item) => item.id !== id);
  saveCartToStorage(updated);
};

export const getCartCount = (): number => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  return cart.length;
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};
