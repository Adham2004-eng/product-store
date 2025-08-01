import { useProducts } from "../Action/GetAllProducts";
import { Box, Typography } from "@mui/material";
import ProductCard from "./ProductCard"; 
const ProductList = () => {
  const { products, loading } = useProducts();

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center", 
        padding: 2,
      }}
    >
      {products.map((product) => (
        <Box key={product.id} sx={{ width: 250 }}>
          <ProductCard product={product} />
        </Box>
      ))}
    </Box>
  );
};

export default ProductList;
