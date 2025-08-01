
import type { Product } from "../../../body/Home/Request/SetAllproducts";

export const getCartFromStorage = (): Product[] => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const saveCartToStorage = (cart: Product[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
