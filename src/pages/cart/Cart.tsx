import { Box, Button, Divider, Grid, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addtoOrders,
  clearCart,
  decreaseQuantity,
} from "../../redux/cartSlice";
import { CartProduct } from "./CartProduct";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import type { RootState } from "../../redux/store";
import type { CartItem } from "../../interfaces/SliceInterfaces";

const Cart = () => {
  const id = localStorage.getItem("token");
  const cart = useSelector((state: RootState) =>
    state.cart.cartItems.filter((item) => item.userId === id)
  );

  const shippingCharges = 5;
  const totalProductPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  const totalItems = cart.length;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleIncrease = (cart: Omit<CartItem, "quantity">) => {
    dispatch(addToCart({ ...cart, userId: id ?? "" }));
  };

  const handleDecrease = (cart: { id: number | string; userId: string }) => {
    dispatch(decreaseQuantity(cart));
  };

  const theme = useTheme();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      px={{ xs: 2, sm: 4, md: 8 }}
      py={6}
    >
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={4}
        flexWrap="wrap"
        gap={2}
      >
        <Divider
          sx={{ flexGrow: 1, height: 2, bgcolor: "grey.400", border: "none" }}
        />
        <Typography variant="h5" fontWeight={700} whiteSpace="nowrap">
          Your Cart
        </Typography>
        <Divider
          sx={{ flexGrow: 1, height: 2, bgcolor: "grey.400", border: "none" }}
        />
      </Box>

      {/* Main Content */}
      <Grid container spacing={4}>
        {/* LEFT: Product List */}
        <Grid size={{ xs: 12, md: 8, lg: 12 }}>
          {cart.length > 0 ? (
            <>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Product Details
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                {cart.map((cartItems) => (
                  <CartProduct
                    key={cartItems.id}
                    cart={cartItems}
                    handleDecrease={handleDecrease}
                    handleIncrease={handleIncrease}
                  />
                ))}
              </Box>
            </>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={4}
            >
              <Typography
                color="text.secondary"
                fontWeight="bold"
                fontSize={25}
                textAlign="center"
              >
                Your cart is empty.
              </Typography>
            </Box>
          )}
        </Grid>

        {cart.length > 0 && (
          <Grid size={{ xs: 12 }}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, md: 4 },
                borderRadius: 3,
                width: "100%",
                // maxWidth: 500,
                mx: "auto",
                backgroundColor: theme.palette.background.paper,
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              }}
            >
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
                textAlign="center"
              >
                Price Details ({totalItems} {totalItems > 1 ? "Items" : "Item"})
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography color="text.secondary">Product Price</Typography>
                <Typography color="text.primary">
                  ${totalProductPrice.toFixed(2)}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography color="text.secondary">Shipping</Typography>
                <Typography color="green">
                  + ${shippingCharges.toFixed(2)}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography fontWeight={600}>Order Total</Typography>
                <Typography fontWeight={600}>
                  ${(totalProductPrice + shippingCharges).toFixed(2)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  dispatch(addtoOrders({ cartItems: cart, userId: id ?? "" }));
                  dispatch(clearCart({ userId: id ?? "" }));
                  navigate("/orderplaced");
                }}
                sx={{
                  py: 1.5,
                  mt: 1,
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: "none",
                  bgcolor: "#e4ccae",
                  color: "#000",
                  "&:hover": {
                    bgcolor: "#d6bb9c",
                  },
                }}
              >
                Place Order
              </Button>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Cart;
