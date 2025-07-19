import { Drawer, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";
import ForgetPassForm from "../../components/auth/ForgetPassForm";
import { useDispatch } from "react-redux";
import { clearErrors } from "../../redux/authSlice";

interface AuthDrawerProps {
  open: boolean;
  onClose: () => void;
}

const AuthDrawer = ({ open, onClose }: AuthDrawerProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(clearErrors());
    setIsLogin(true);
    setIsForgot(false);
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box
        width={{ xs: "80vw", sm: 400 }}
        p={4}
        display="flex"
        flexDirection="column"
        sx={{
          backgroundColor: "#fff8f1",
          height: "100%",
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          mt={4}
          display="flex"
          flexDirection="column"
          gap={2}
          textAlign={"center"}
        >
          {isForgot ? (
            <ForgetPassForm setIsForgot={setIsForgot} />
          ) : isLogin ? (
            <LoginForm
              setIsLogin={setIsLogin}
              onClose={handleClose}
              setIsForgot={setIsForgot}
            />
          ) : (
            <RegisterForm setIsLogin={setIsLogin} />
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default AuthDrawer;
