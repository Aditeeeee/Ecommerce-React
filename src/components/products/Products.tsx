import type { ProductType } from "../../interfaces/globalInterfaces";
import ProductCard from "./ProductCard";
import { Grid } from "@mui/material";

interface ProductsProps {
  data: ProductType[];
  openLoginDrawer: () => void;
}

const Products = ({ data, openLoginDrawer }: ProductsProps) => {
  return (
    <Grid container spacing={2}>
      {data.map((product) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
          <ProductCard
            product={product}
            openLoginDrawer={openLoginDrawer}
            isWishlist={false}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
