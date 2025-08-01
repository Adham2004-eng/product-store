
import { getProductDetails } from "../Request/productDetailsRequest";
import type { Product } from "../../../body/Home/Request/SetAllproducts";

export const fetchProductDetails = async (id: number): Promise<Product | null> => {
  try {
    const product = await getProductDetails(id);
    return product;
  } catch (error) {
    console.error("Failed to fetch product details:", error);
    return null;
  }
};
