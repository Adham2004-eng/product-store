import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography, CircularProgress, Container } from "@mui/material";
import ProductCard from "../Home/Component/ProductCard"; 
import type { Product } from "../Home/Request/SetAllproducts"; 
const WomensClothes = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        const filtered = res.data.filter(
          (product: Product) => product.category === "women's clothing"
        );
        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: "bold",
          color: "#f5f5f5",
          textAlign: "center",
        }}
      >
       women's clothing
      </Typography>

      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {products.map((product) => (
            <Grid  key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default WomensClothes;
