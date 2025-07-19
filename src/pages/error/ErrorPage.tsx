import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

interface ErrorPageProps {
  isButton: boolean;
  errorMsg: string;
  isText: boolean;
}

const ErrorPage = ({ isButton, errorMsg, isText }: ErrorPageProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      minHeight="80vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={2}
      py={6}
      textAlign="center"
      bgcolor="#fff8f1"
    >
      <Typography
        variant={isMobile ? "h5" : "h3"}
        fontWeight={700}
        sx={{
          color: "black",
        }}
        mb={1}
      >
        {errorMsg}
      </Typography>

      {isText && (
        <Typography
          variant="body1"
          sx={{
            color: "black",
          }}
          maxWidth={400}
          mb={3}
        >
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </Typography>
      )}

      {isButton && (
        <Button
          variant="contained"
          size={isMobile ? "medium" : "large"}
          sx={{
            bgcolor: "#e4ccae",
            color: "#000",
            textTransform: "none",
            fontWeight: 600,
            px: 4,
            py: 1.5,
            borderRadius: 2,
            "&:hover": { bgcolor: "#d6bb9c" },
          }}
          onClick={() => navigate("/")}
        >
          Go Back Home
        </Button>
      )}
    </Box>
  );
};

export default ErrorPage;
