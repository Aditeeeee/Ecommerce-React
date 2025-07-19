import { Box, Grid, Typography, Button, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProductCard from "../../components/products/ProductCard";
import { useOutletContext, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getAllProducts } from "../../apis/products";
import type {
  OutletContextType,
  ProductType,
} from "../../interfaces/globalInterfaces";

const CategoryPage = () => {
  const { title } = useParams();
  const { openLoginDrawer } = useOutletContext<OutletContextType>();

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const filteredProducts = products?.filter(
    (p: ProductType) => p.category.toLowerCase() === title?.toLowerCase()
  );

  return (
    <Box px={{ xs: 2, md: 4 }} py={4} minHeight="100vh" bgcolor="#fff">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => window.history.back()}
        sx={{
          mb: 2,
          textTransform: "none",
          fontWeight: 600,
          color: "text.primary",
        }}
      >
        Back
      </Button>

      <Typography
        variant="h4"
        fontWeight={700}
        textAlign="center"
        mb={4}
        color="text.primary"
      >
        {title}
      </Typography>

      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="40vh"
        >
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography color="error" textAlign="center">
          {(error as Error).message ||
            "Something went wrong while fetching products."}
        </Typography>
      ) : filteredProducts?.length === 0 ? (
        <Typography textAlign="center" color="text.secondary">
          No products found in this category.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {filteredProducts.map((product: ProductType) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
              <ProductCard
                product={product}
                openLoginDrawer={openLoginDrawer}
                isWishlist={false}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CategoryPage;
