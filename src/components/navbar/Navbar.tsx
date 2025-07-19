import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Home as HomeIcon,
  Favorite as FavoriteIcon,
  ShoppingCart as ShoppingCartIcon,
  Login as LoginIcon,
  Menu as MenuIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import logoImg from "../../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { logout, deleteUser } from "../../redux/authSlice";
import type { RootState } from "../../redux/store";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";

interface NavbarProps {
  setAuthOpen: (open: boolean) => void;
}

const Navbar = ({ setAuthOpen }: NavbarProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { isAuthenticated, currentUser } = useSelector(
    (state: RootState) => state.auth
  );
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlist);
  const cart = useSelector((state: RootState) => state.cart.cartItems);
  const userId = currentUser?.userId;
  const localId = localStorage.getItem("token");

  const Wishlist = wishlist.filter((list) => list.userId === localId);
  const CartItems = cart.filter((list) => list.userId === localId);

  useEffect(() => {
    if (!isAuthenticated) setAnchorEl(null);
  }, [isAuthenticated]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDeleteAccount = () => {
    if (userId) {
      dispatch(deleteUser(userId));
      dispatch(logout());
      localStorage.removeItem("token");
      handleMenuClose();
      navigate("/");
    }
  };

  const navItems = [
    {
      label: "Home",
      icon: <HomeIcon />,
      path: "/",
    },
    {
      label: "Wishlist",
      icon: (
        <Badge badgeContent={Wishlist.length} color="error">
          <FavoriteIcon />
        </Badge>
      ),
      path: "/wishlist",
    },
    {
      label: "Cart",
      icon: (
        <Badge badgeContent={CartItems.length} color="error">
          <ShoppingCartIcon />
        </Badge>
      ),
      path: "/cart",
    },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#e4ccae" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* Logo */}
          <Box
            component={motion.img}
            src={logoImg}
            height={40}
            width={150}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Desktop Nav */}
          {!isMobile && (
            <Box display="flex" alignItems="center" gap={4}>
              {navItems.map(({ label, icon, path }) => (
                <NavLink
                  to={path}
                  key={label}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <IconButton sx={{ color: "white" }}>{icon}</IconButton>
                </NavLink>
              ))}

              {isAuthenticated ? (
                <>
                  <IconButton sx={{ color: "white" }} onClick={handleMenuOpen}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        navigate("/orders");
                      }}
                    >
                      Your Orders
                    </MenuItem>
                    <MenuItem onClick={handleDeleteAccount}>
                      Delete Account
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <IconButton
                  sx={{ color: "white" }}
                  onClick={() => setAuthOpen(true)}
                >
                  <LoginIcon />
                </IconButton>
              )}
            </Box>
          )}

          {/* Mobile Nav */}
          {isMobile && (
            <>
              <IconButton
                sx={{ color: "white" }}
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>

              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box width={260} role="presentation" p={2}>
                  <List>
                    {/* Navigation Items */}
                    {navItems.map(({ label, icon, path }) => (
                      <ListItemButton
                        key={label}
                        onClick={() => {
                          setDrawerOpen(false);
                          navigate(path);
                        }}
                      >
                        {icon}
                        <ListItemText primary={label} sx={{ ml: 1 }} />
                      </ListItemButton>
                    ))}

                    {/* Authenticated Options */}
                    {isAuthenticated ? (
                      <>
                        <ListItemButton
                          onClick={() => {
                            navigate("/orders");
                            setDrawerOpen(false);
                          }}
                        >
                          <Inventory2Icon sx={{ color: "black", mr: 1 }} />
                          <ListItemText primary="Your Orders" />
                        </ListItemButton>

                        <ListItemButton onClick={handleDeleteAccount}>
                          <DeleteIcon sx={{ color: "black", mr: 1 }} />
                          <ListItemText primary="Delete Account" />
                        </ListItemButton>

                        <ListItemButton onClick={handleLogout}>
                          <LogoutIcon sx={{ color: "black", mr: 1 }} />
                          <ListItemText primary="Logout" />
                        </ListItemButton>
                      </>
                    ) : (
                      <ListItemButton
                        onClick={() => {
                          setAuthOpen(true);
                          setDrawerOpen(false);
                        }}
                      >
                        <LoginIcon sx={{ mr: 1 }} />
                        <ListItemText primary="Login" />
                      </ListItemButton>
                    )}
                  </List>
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
