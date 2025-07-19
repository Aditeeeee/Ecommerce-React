import { Box, Grid, Typography, Container } from "@mui/material";
import BannerImg from "../../assets/Banner.png";
import { categoryData } from "../../utils/categoryData";
import { useQuery } from "react-query";
import { getAllProducts } from "../../apis/products";
import ErrorPage from "../error/ErrorPage";
import Products from "../../components/products/Products";
import Loading from "../../components/loading/Loading";
import SectionTitle from "../../components/title/SectionTitle";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../../components/products/ProductCard";
import { motion } from "framer-motion";

import type { RootState } from "../../redux/store";
import type {
  OutletContextType,
  ProductType,
} from "../../interfaces/globalInterfaces";

const HomePage = () => {
  const { data, isLoading, isError, error } = useQuery<ProductType[], Error>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const id = localStorage.getItem("token");

  const recentlyBrowsed = useSelector(
    (state: RootState) => state.auth.recentlyBrowsed
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const navigate = useNavigate();
  const { openLoginDrawer } = useOutletContext<OutletContextType>();

  const personalRecentlyBrowsed = recentlyBrowsed.filter(
    (product) => product.userId === id
  );

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container maxWidth="xl" disableGutters>
      {/* Banner Section */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        sx={{ overflow: "hidden", mb: 5 }}
      >
        <img
          src={BannerImg}
          alt="Banner"
          style={{ width: "100%", maxHeight: 500, objectFit: "cover" }}
        />
      </Box>

      {/* Recently Browsed Section */}
      {personalRecentlyBrowsed?.length > 0 && isAuthenticated && (
        <Box
          component={motion.div}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          mb={5}
        >
          <SectionTitle title="RECENTLY BROWSED" />
          <Grid container spacing={3} px={{ xs: 2, sm: 4, md: 8 }}>
            {personalRecentlyBrowsed.map((item) => {
              const fullProduct = data?.find((p) => p.id === item.id);
              return (
                fullProduct && (
                  <Grid
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                    key={fullProduct.id}
                  >
                    <ProductCard
                      product={fullProduct}
                      openLoginDrawer={openLoginDrawer}
                      isWishlist={false}
                    />
                  </Grid>
                )
              );
            })}
          </Grid>
        </Box>
      )}

      {/* Category Section */}
      <Box
        component={motion.div}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
        mb={5}
      >
        <SectionTitle title="CATEGORY" />
        <Grid
          container
          spacing={4}
          justifyContent="center"
          px={{ xs: 2, sm: 4, md: 8 }}
        >
          {categoryData.map((category) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={category.title}>
              <Box
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => navigate(`/category/${category.title}`)}
                sx={{
                  width: "100%",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    backgroundColor: "white",
                  }}
                >
                  <img
                    src={category.image}
                    alt={category.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "fill",
                    }}
                  />
                </Box>
                <Typography variant="body1" fontWeight={700} textAlign="center">
                  {category.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* All Products Section */}
      <Box
        component={motion.div}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        mb={8}
      >
        <SectionTitle title="ALL PRODUCTS" />
        {isError ? (
          <ErrorPage
            isButton={false}
            isText={false}
            errorMsg={error?.message}
          />
        ) : isLoading ? (
          <Loading />
        ) : data && data.length > 0 ? (
          <Products data={data} openLoginDrawer={openLoginDrawer} />
        ) : (
          <Typography
            align="center"
            color="text.secondary"
            mt={3}
            fontWeight={"bold"}
            fontSize={25}
          >
            No data found.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
