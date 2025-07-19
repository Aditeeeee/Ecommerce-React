import {
  Box,
  Typography,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Tick from "../../assets/tick.png";
import { useNavigate } from "react-router-dom";

const OrderPlaced = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleContinue = () => {
    navigate("/");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={2}
      py={4}
      bgcolor="#f5f7fa"
    >
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          textAlign: "center",
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          bgcolor: "#fff",
        }}
      >
        <Box display="flex" justifyContent="center" mb={3}>
          <img
            src={Tick}
            alt="Order Placed"
            style={{
              width: isMobile ? 80 : 100,
              height: isMobile ? 80 : 100,
            }}
          />
        </Box>

        <Typography
          variant={isMobile ? "h6" : "h5"}
          fontWeight={700}
          gutterBottom
          color="text.primary"
        >
          Order Placed Successfully!
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3}>
          Thank you for shopping with us. Your order has been placed and is
          being processed.
        </Typography>

        <Button
          variant="contained"
          fullWidth
          onClick={handleContinue}
          sx={{
            bgcolor: "#4caf50",
            "&:hover": { bgcolor: "#43a047" },
            textTransform: "none",
            fontWeight: 600,
            py: 1.4,
            borderRadius: 2,
            fontSize: "1rem",
          }}
        >
          Continue Shopping
        </Button>
      </Paper>
    </Box>
  );
};

export default OrderPlaced;
