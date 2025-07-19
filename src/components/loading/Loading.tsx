import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 6,
        mb: 4,
      }}
    >
      <CircularProgress sx={{ color: "#e4ccae" }} />
    </Box>
  );
};

export default Loading;
