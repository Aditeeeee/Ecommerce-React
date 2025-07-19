import { Box, Typography, IconButton, Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList, removeFromWishList } from "../../redux/wishListSlice";
import type { RootState } from "../../redux/store";
import type { ProductType } from "../../interfaces/globalInterfaces";
import { motion } from "framer-motion";

interface ProductModalProps {
  open: boolean;
  handleClose: () => void;
  product: ProductType | null;
  handleAddToCart: () => void;
  openDrawerLogin: () => void;
}

const ProductModal = ({
  open,
  handleClose,
  product,
  handleAddToCart,
  openDrawerLogin,
}: ProductModalProps) => {
  const dispatch = useDispatch();
  const id = localStorage.getItem("token");

  const isLiked = useSelector((state: RootState) =>
    state.wishlist.wishlist.some(
      (item) => item.id === product?.id && item.userId === id
    )
  );

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleToggleWishList = () => {
    if (!product) return;
    if (isAuthenticated) {
      if (isLiked) {
        dispatch(removeFromWishList({ id: product.id, userId: id ?? "" }));
      } else {
        dispatch(addToWishList({ ...product, userId: id ?? "" }));
      }
    } else {
      handleClose();
      openDrawerLogin();
    }
  };

  if (!product) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1300,
          p: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          style={{ width: "100%", maxWidth: 500 }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              borderRadius: 3,
              boxShadow: 24,
              p: 3,
              position: "relative",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {/* Close Button */}
            <IconButton
              sx={{ position: "absolute", top: 8, right: 8 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>

            {/* Product Image */}
            <Box
              sx={{
                p: 3,
                pt: 5,
                width: "100%",
                height: 250,
                overflow: "hidden",
                borderRadius: 2,
                bgcolor: "#f5f5f5",
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>

            <Typography variant="h6" fontWeight={700} mt={2}>
              {product.title}
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={1}>
              {product.description}
            </Typography>

            <Typography variant="h6" fontWeight={700} color="#5e493a" mt={2}>
              ${product.price}
            </Typography>

            {/* Wishlist + Cart Buttons */}
            <Box display="flex" gap={2} mt={3}>
              <IconButton
                onClick={handleToggleWishList}
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
              >
                {isLiked ? (
                  <FavoriteIcon sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: "#555" }} />
                )}
              </IconButton>

              <Button
                variant="contained"
                sx={{
                  flexGrow: 1,
                  bgcolor: "#e4ccae",
                  color: "#000",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": { bgcolor: "#d6bb9c" },
                }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </Modal>
  );
};

export default ProductModal;
