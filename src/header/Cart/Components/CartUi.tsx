import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getCartDetails, removeFromCart, clearCart } from "../Action/cartActions";
import type { Product } from "../../../body/Home/Request/SetAllproducts";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type CartItem = Product & { quantity: number };

const CartUI = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);


  useEffect(() => {
    const fetchCart = async () => {
      const items = await getCartDetails();
      const uniqueItems = items.reduce((acc: CartItem[], item) => {
        const existing = acc.find((i) => i.id === item.id);
        if (existing) existing.quantity += 1;
        else acc.push({ ...item, quantity: 1 });
        return acc;
      }, []);
      setCartItems(uniqueItems);
    };
    fetchCart();
  }, []);

 
  const handleRemove = (id: number) => {
    removeFromCart(id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };


  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };


  const handleClearCart = () => {
    clearCart();
    setCartItems([]);
  };


  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Box bgcolor="#121212" minHeight="100vh" color="#fff" py={4} px={{ xs: 2, md: 6 }}>
      <Typography variant="h4" mb={4} fontWeight="bold">
        Your Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" color="gray">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          <Stack spacing={3}>
            {cartItems.map((item) => (
              <Card
                key={item.id}
                sx={{
                  display: "flex",
                  backgroundColor: "#1e1e1e",
                  color: "#fff",
                  borderRadius: 2,
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.4)",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{ width: 140, objectFit: "contain", background: "#fff", p: 2 }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="gray" my={1}>
                    {item.description?.slice(0, 100)}...
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" color="#4caf50">
                    ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                  </Typography>

                  <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                    <IconButton
                      onClick={() => handleQuantityChange(item.id, -1)}
                      sx={{ color: "#fff", background: "#333" }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                      onClick={() => handleQuantityChange(item.id, 1)}
                      sx={{ color: "#fff", background: "#333" }}
                    >
                      <AddIcon />
                    </IconButton>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ ml: "auto" }}
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>

          <Divider sx={{ my: 4, borderColor: "#444" }} />

          <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
            <Typography variant="h5" fontWeight="bold">
              Total: ${totalPrice}
            </Typography>
            <Button
              variant="contained"
              color="success"
              sx={{ px: 4, py: 1.5, fontWeight: "bold", fontSize: 16 }}
            >
              Buy Now
            </Button>
            {cartItems.length > 0 && (
              <Button
                variant="outlined"
                color="error"
                onClick={handleClearCart}
                sx={{ mt: { xs: 2, md: 0 } }}
              >
                Clear Cart
              </Button>
            )}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default CartUI;
