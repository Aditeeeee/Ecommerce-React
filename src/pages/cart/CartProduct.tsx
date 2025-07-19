import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { removeFromCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { addToWishList } from "../../redux/wishListSlice";
import type { CartItem } from "../../interfaces/SliceInterfaces";

interface CartProductProps {
  cart: CartItem;
  handleDecrease: (item: CartItem) => void;
  handleIncrease: (item: CartItem) => void;
}

export const CartProduct = ({
  cart,
  handleDecrease,
  handleIncrease,
}: CartProductProps) => {
  const dispatch = useDispatch();
  const id = localStorage.getItem("token");

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 3,
        my: 2,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "center", sm: "flex-start" },
        gap: 2,
      }}
    >
      <Box
        component="img"
        src={cart.image}
        alt="Product"
        sx={{
          width: { xs: "100%", sm: 100 },
          height: { xs: "auto", sm: 120 },
          objectFit: "cover",
          borderRadius: 2,
        }}
      />

      <Box flexGrow={1} width="100%">
        <Typography fontWeight={600} fontSize={{ xs: 16, sm: 18 }} mb={0.5}>
          {cart.title}
        </Typography>

        <Typography fontWeight={600} color="text.primary">
          ${cart.price}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <Typography fontSize={14}>Qty:</Typography>
          <IconButton
            onClick={() => handleDecrease(cart)}
            size="small"
            sx={{ border: "1px solid grey", borderRadius: 1 }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography>{cart.quantity}</Typography>
          <IconButton
            onClick={() => handleIncrease(cart)}
            size="small"
            sx={{ border: "1px solid grey", borderRadius: 1 }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box
          display="flex"
          justifyContent={{ xs: "center", sm: "flex-end" }}
          gap={1}
          mt={2}
          flexWrap="wrap"
        >
          <Button
            onClick={() => {
              dispatch(
                addToWishList({
                  id: Number(cart.id),
                  title: cart.title,
                  price: cart.price,
                  image: cart.image,
                  userId: id ?? "",
                  description: "No description",
                  category: "general",
                  rating: { rate: 0, count: 0 },
                })
              );
              dispatch(removeFromCart({ id: cart.id, userId: id ?? "" }));
            }}
            sx={{
              textTransform: "none",
              color: "white",
              bgcolor: "#e4ccae",
              borderRadius: 3,
            }}
          >
            Move to Wishlist
          </Button>
          <Button
            onClick={() =>
              dispatch(removeFromCart({ id: cart.id, userId: id ?? "" }))
            }
            sx={{
              textTransform: "none",
              color: "white",
              bgcolor: "#e4ccae",
              borderRadius: 3,
            }}
          >
            ✕ Remove
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
