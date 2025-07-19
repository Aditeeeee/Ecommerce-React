import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
  Collapse,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logoImg from "../../assets/logo.png";
import { useState } from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const [open, setOpen] = useState(false);

  const quickLinks = ["Home", "Shop", "Wishlist", "Cart", "Contact"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ bgcolor: "#e4ccae", mt: 8, pt: 6, pb: 3 }}>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={4}
            justifyContent="space-between"
            alignItems="flex-start"
            textAlign={{ xs: "center", md: "left" }}
          >
            {/* Logo & Description */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems={{ xs: "center", md: "flex-start" }}
              >
                <img
                  src={logoImg}
                  alt="Logo"
                  width={150}
                  style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.2))" }}
                />
                <Typography
                  mt={2}
                  color="text.primary"
                  maxWidth={280}
                  fontSize={15}
                >
                  Discover beautiful ethnic wear curated with love for your
                  everyday style.
                </Typography>
              </Box>
            </Grid>

            {/* Quick Links */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box
                display="flex"
                justifyContent={{
                  xs: "center",
                  md: "space-between",
                }}
                alignItems="center"
                mb={1}
              >
                <Typography variant="h6" fontWeight={600}>
                  Quick Links
                </Typography>
                <Box display={{ xs: "block", md: "none" }}>
                  <IconButton onClick={() => setOpen(!open)} size="small">
                    {open ? <CloseIcon /> : <MenuIcon />}
                  </IconButton>
                </Box>
              </Box>

              <Collapse in={open || window.innerWidth >= 960} timeout="auto">
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={0.5}
                  alignItems={{ xs: "center", md: "flex-start" }}
                >
                  {quickLinks.map((link) => (
                    <Typography
                      key={link}
                      variant="body2"
                      color="text.primary"
                      sx={{
                        cursor: "pointer",
                        "&:hover": { color: "#8d6e63" },
                      }}
                    >
                      {link}
                    </Typography>
                  ))}
                </Box>
              </Collapse>
            </Grid>

            {/* Contact & Social */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Contact
              </Typography>
              <Typography variant="body2" color="text.primary">
                support@yourecommerce.com
              </Typography>
              <Typography variant="body2" color="text.primary" mb={1}>
                +91 9876543210
              </Typography>
              <Box
                mt={1}
                display="flex"
                justifyContent={{ xs: "center", md: "flex-start" }}
                gap={1}
              >
                <IconButton sx={{ color: "#8d6e63" }}>
                  <InstagramIcon />
                </IconButton>
                <IconButton sx={{ color: "#8d6e63" }}>
                  <FacebookIcon />
                </IconButton>
                <IconButton sx={{ color: "#8d6e63" }}>
                  <TwitterIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Divider sx={{ my: 3, borderColor: "#d7bfa8" }} />

        <Typography variant="body2" color="text.primary" textAlign="center">
          © {new Date().getFullYear()} ShopEasy. All rights reserved.
        </Typography>
      </Box>
    </motion.div>
  );
};

export default Footer;
