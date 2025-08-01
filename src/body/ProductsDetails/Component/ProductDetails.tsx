import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../Action/productDetailsAction";
import type { Product } from "../../../body/Home/Request/SetAllproducts";
import { addToCart } from "../../../header/Cart/Action/cartActions";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Rating,
  Stack,
} from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const loadDetails = async () => {
      const data = await fetchProductDetails(Number(id));
      setProduct(data);
      setLoading(false);
    };
    loadDetails();
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="#121212"
      >
        <CircularProgress sx={{ color: "#FFD700" }} />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box textAlign="center" mt={5} color="white">
        <Typography variant="h6" color="error">
          Product not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      width="100%"
      minHeight="100vh"
      bgcolor="#121212"
      py={6}
      px={{ xs: 2, md: 6 }}
      boxSizing="border-box"
    >
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        maxWidth="1400px"
        mx="auto"
        bgcolor="#1e1e1e"
        borderRadius={3}
        boxShadow="0 8px 30px rgba(0, 0, 0, 0.5)"
        overflow="hidden"
      >
  
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="#2c2c2c"
          p={4}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{
              maxHeight: "450px",
              width: "100%",
              objectFit: "contain",
              backgroundColor: "#1e1e1e",
              padding: "20px",
              borderRadius: "10px",
            }}
          />
        </Box>


        <Box
          flex={1.2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          px={5}
          py={4}
          color="#fff"
        >
          <Typography variant="h4" fontWeight={700} mb={2}>
            {product.title}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <Rating
              value={product.rating?.rate || 0}
              precision={0.5}
              readOnly
              sx={{ color: "#FFD700" }}
            />
            <Typography variant="body2" sx={{ color: "#bbb" }}>
              ({product.rating?.count || 0} reviews)
            </Typography>
          </Stack>

          <Typography
            variant="body1"
            sx={{ color: "#ccc" }}
            mb={2}
            lineHeight={1.7}
          >
            {product.description}
          </Typography>

          <Typography variant="h5" fontWeight="bold" color="green" mb={1}>
            ${product.price.toFixed(2)}
          </Typography>

          <Typography variant="subtitle2" sx={{ color: "#999" }} mb={3}>
            Category: {product.category}
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#b91515ff",
              color: "#000",
              width: "250px",
              fontWeight: "bold",
              fontSize: "16px",
              py: 1.5,
              borderRadius: 3,
              "&:hover": {
                backgroundColor: "#7e1515ff",
              },
            }}
            onClick={() => addToCart(product)} 
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;
