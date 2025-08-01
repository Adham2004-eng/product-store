import { useEffect, useState } from "react";
import { getAllProducts } from "../Request/SetAllproducts"; 
import type { Product } from "../Request/SetAllproducts";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
};
