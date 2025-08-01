import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Rating,
  Stack,
} from "@mui/material";
import type { Product } from "../../../body/Home/Request/SetAllproducts";
import { addToCart } from "../../../header/Cart/Action/cartActions"; 

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    addToCart(product); 
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        width: 240,
        height: 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
        boxShadow: 4,
        backgroundColor: "#121212",
        color: "#e0e0e0",
        cursor: "pointer",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        sx={{
          height: 180,
          objectFit: "contain",
          backgroundColor: "#1e1e1e",
          padding: 2,
        }}
      />

      <CardContent sx={{ flex: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            fontSize: 15,
            color: "#f5f5f5",
            mb: 1,
          }}
        >
          {product.title.length > 40
            ? product.title.slice(0, 40) + "..."
            : product.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontSize: 13.5,
            color: "#b0b0b0",
            lineHeight: 1.6,
            mb: 1,
          }}
        >
          {product.description.length > 100
            ? product.description.slice(0, 100) + "..."
            : product.description}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <Rating
            name="product-rating"
            value={product.rating?.rate || 0}
            precision={0.5}
            readOnly
            size="small"
            sx={{
              color: "#FFD700",
            }}
          />
          <Typography sx={{ fontSize: 13, color: "#ccc" }}>
            ({product.rating?.count || 0})
          </Typography>
        </Stack>

        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#ff3c38",
            fontSize: 17,
          }}
        >
          ${product.price}
        </Typography>
      </CardContent>

      <Box sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleAddToCart}
          sx={{
            backgroundColor: "#b71c1c",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 14,
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
