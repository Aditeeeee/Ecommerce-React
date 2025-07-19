import { Box, Typography, Divider, Paper, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

const Orders = () => {
  const id = localStorage.getItem("token");

  const orders =
    useSelector((state: RootState) =>
      state.cart.orders.filter((order) => order.userId === id)
    ) || [];

  return (
    <Box
      sx={{
        bgcolor: "#f9f9f9",
        minHeight: "100vh",
        py: { xs: 3, md: 6 },
        px: { xs: 2, sm: 4 },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1000,
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: 3,
          p: { xs: 3, md: 5 },
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h5" fontWeight={700} sx={{ color: "black" }}>
            Your Orders
          </Typography>
          <Divider sx={{ mt: 2, bgcolor: "#ddd" }} />
        </Box>

        {orders.length === 0 ? (
          <Typography
            align="center"
            color="text.secondary"
            mt={3}
            fontWeight={"bold"}
            fontSize={25}
          >
            No orders placed yet.
          </Typography>
        ) : (
          <Stack spacing={5}>
            {orders.map((order) => (
              <Box key={order.id}>
                <Paper
                  elevation={1}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    borderRadius: 3,
                    bgcolor: "#fafafa",
                  }}
                >
                  <Box mb={2}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Order ID: <strong>{order.id}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Placed on:{" "}
                      {new Date(order.orderDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Expected Delivery:{" "}
                      <strong>
                        {new Date(order.deliveryDate).toLocaleDateString()}
                      </strong>
                    </Typography>
                  </Box>

                  <Stack spacing={2}>
                    {order.items.map((item, i) => (
                      <Paper
                        key={i}
                        variant="outlined"
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          alignItems: "center",
                          gap: 2,
                          p: 2,
                          borderRadius: 2,
                          transition: "0.2s",
                          "&:hover": {
                            boxShadow: 2,
                            backgroundColor: "#fffefc",
                          },
                        }}
                      >
                        <Box
                          component="img"
                          src={item.image}
                          alt={item.title}
                          sx={{
                            width: 80,
                            height: 80,
                            objectFit: "contain",
                            backgroundColor: "#f0f0f0",
                            borderRadius: 1,
                          }}
                        />
                        <Box
                          sx={{
                            flex: 1,
                            textAlign: { xs: "center", sm: "left" },
                          }}
                        >
                          <Typography fontWeight={600}>{item.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Quantity: {item.quantity}
                          </Typography>
                        </Box>
                        <Typography fontWeight={600}>
                          ${(+item.price * +item.quantity).toFixed(2)}
                        </Typography>
                      </Paper>
                    ))}
                  </Stack>
                </Paper>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default Orders;
