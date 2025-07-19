import { Box, Divider, Grid, Typography } from "@mui/material";
import ProductCard from "../../components/products/ProductCard";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import type { RootState } from "../../redux/store";
import type { OutletContextType } from "../../interfaces/globalInterfaces";

const WishList = () => {
  const wishListData = useSelector(
    (state: RootState) => state.wishlist.wishlist
  );
  const userId = localStorage.getItem("token");

  const personalWishList = wishListData.filter(
    (product) => product.userId === userId
  );

  const { openLoginDrawer } = useOutletContext<OutletContextType>();

  return (
    <Box
      sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 4 }, minHeight: "100vh" }}
    >
      {/* Heading */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 5,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 1000 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: "center",
            }}
          >
            <Divider sx={{ flexGrow: 1, height: 2, bgcolor: "grey.400" }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                letterSpacing: 1,
                color: "text.primary",
                whiteSpace: "nowrap",
              }}
            >
              Your Wishlist
            </Typography>
            <Divider sx={{ flexGrow: 1, height: 2, bgcolor: "grey.400" }} />
          </Box>
        </Box>
      </Box>

      {/* Wishlist items */}
      {personalWishList.length === 0 ? (
        <Typography
          align="center"
          color="text.secondary"
          mt={3}
          fontWeight={"bold"}
          fontSize={25}
        >
          Your wishlist is currently empty.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {personalWishList.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
              <ProductCard
                product={product}
                openLoginDrawer={openLoginDrawer}
                isWishlist={true}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default WishList;
