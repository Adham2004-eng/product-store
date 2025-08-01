import type { Product } from "../../../body/Home/Request/SetAllproducts";
import axios from "axios";

export const filterProductsBySearch = async (query: string): Promise<Product[]> => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    const data: Product[] = response.data;

    const filtered = data.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );

    return filtered;
  } catch (error) {
    console.error("Search Error:", error);
    return [];
  }
};
