import { useState } from "react";
import { Box, Button, Typography, Stack, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ProductModal from "../modal/ProductModal";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeFromWishList } from "../../redux/wishListSlice";
import { recentlyBrowsed } from "../../redux/authSlice";
import { addToCart } from "../../redux/cartSlice";
import type { RootState } from "../../redux/store";
import type { ProductType } from "../../interfaces/globalInterfaces";

interface ProductCardProps {
  isWishlist: boolean;
  product: ProductType;
  openLoginDrawer: () => void;
}

const ProductCard = ({
  product,
  openLoginDrawer,
  isWishlist,
}: ProductCardProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const id = localStorage.getItem("token");

  const handleOpenModal = () => {
    if (isAuthenticated) {
      dispatch(recentlyBrowsed({ ...product, userId: id ?? "" }));
    }

    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setOpenModal(false);
      openLoginDrawer();
    } else {
      if (isWishlist) {
        dispatch(removeFromWishList({ id: product.id, userId: id ?? "" }));
        dispatch(addToCart({ ...product, userId: id ?? "" }));
      } else {
        dispatch(addToCart({ ...product, userId: id ?? "" }));
      }

      handleCloseModal();
    }
  };

  return (
    <>
      <motion.div
        whileHover={{
          scale: 1.03,
          boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
        }}
        whileTap={{ scale: 0.97 }}
        style={{
          width: 230,
          borderRadius: "12px",
          overflow: "hidden",
          background: "#ffffff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          cursor: "pointer",
          transition: "all 0.3s ease",
          marginLeft: 40,
          marginBottom: 10,
        }}
      >
        <Box
          component="img"
          src={product.image}
          alt={product.title}
          onClick={handleOpenModal}
          sx={{
            width: "100%",
            height: 160,
            objectFit: "contain",
            p: 1.5,
            backgroundColor: "#f9f9f9",
          }}
        />

        <Box px={1.5} pb={1.5}>
          <Typography fontWeight={600} fontSize="0.9rem" mt={1} noWrap>
            {product.title}
          </Typography>

          <Typography
            variant="body2"
            fontSize="0.75rem"
            color="text.secondary"
            mt={0.5}
          >
            ⭐ {product.rating.rate}
          </Typography>

          <Typography fontWeight={700} fontSize="0.85rem" color="#333" mt={0.5}>
            ${product.price}
          </Typography>

          <Stack direction="row" spacing={1} mt={1}>
            <Button
              variant="contained"
              size="small"
              fullWidth
              onClick={handleAddToCart}
              sx={{
                borderRadius: 2,
                backgroundColor: "#e4ccae",
                color: "white",
                textTransform: "none",
                fontSize: "0.7rem",
                padding: "2px 4px",
                "&:hover": { backgroundColor: "#d2b895" },
              }}
            >
              Add to Cart
            </Button>
            {isWishlist && (
              <IconButton
                onClick={() =>
                  dispatch(
                    removeFromWishList({ id: product.id, userId: id ?? "" })
                  )
                }
              >
                <DeleteIcon color="error" />
              </IconButton>
            )}
          </Stack>
        </Box>
      </motion.div>

      <ProductModal
        open={openModal}
        handleClose={handleCloseModal}
        product={product}
        handleAddToCart={handleAddToCart}
        openDrawerLogin={openLoginDrawer}
      />
    </>
  );
};

export default ProductCard;
