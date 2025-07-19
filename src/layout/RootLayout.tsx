import { Box } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import { useState, useRef, useEffect } from "react";
import AuthDrawer from "../pages/authDrawer/AuthDrawer";
import { AnimatePresence, motion } from "framer-motion";

const RootLayout = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const location = useLocation();

  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return (
    <>
      <Navbar setAuthOpen={setAuthOpen} />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={isFirstRender.current ? {} : { opacity: 0 }} // Skip exit on first render
          transition={{ duration: 0.4 }}
        >
          <Box py={2} px={4}>
            <Outlet context={{ openLoginDrawer: () => setAuthOpen(true) }} />
          </Box>
        </motion.div>
      </AnimatePresence>

      <Footer />
      <AuthDrawer open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default RootLayout;
