import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Form } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loginUser } from "../../redux/authSlice";
import type { AppDispatch, RootState } from "../../redux/store";

interface LoginFormProps {
  setIsLogin: (value: boolean) => void;
  setIsForgot: (value: boolean) => void;
  onClose: () => void;
}

const LoginForm = ({ setIsLogin, onClose, setIsForgot }: LoginFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const error = useSelector(
    (state: RootState) => state.auth?.error?.loginError
  );

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const result = await dispatch(loginUser(values));
      if (loginUser.fulfilled.match(result)) {
        localStorage.setItem("token", result.payload.userId);
        onClose();
      } else {
        setIsLogin(true);
      }
    },
  });
  return (
    <>
      <Box mt={4} mb={1} textAlign="center">
        <Typography variant="h5" fontWeight={700}>
          Login
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" gap={1} textAlign="center">
        <Typography variant="body2">or</Typography>
        <Typography
          variant="body2"
          color="#e4ccae"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            dispatch(clearErrors());
            setIsLogin(false);
          }}
        >
          create a new account
        </Typography>
      </Box>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Form
        onSubmit={loginFormik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          size="small"
          fullWidth
          onChange={loginFormik.handleChange}
          onBlur={loginFormik.handleBlur}
          value={loginFormik.values.email}
          error={loginFormik.touched.email && Boolean(loginFormik.errors.email)}
          helperText={loginFormik.touched.email && loginFormik.errors.email}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          size="small"
          fullWidth
          onChange={loginFormik.handleChange}
          onBlur={loginFormik.handleBlur}
          value={loginFormik.values.password}
          error={
            loginFormik.touched.password && Boolean(loginFormik.errors.password)
          }
          helperText={
            loginFormik.touched.password && loginFormik.errors.password
          }
        />
        <Typography
          variant="caption"
          color="#e4ccae"
          sx={{ cursor: "pointer", alignSelf: "flex-end" }}
          onClick={() => {
            dispatch(clearErrors());
            setIsForgot(true);
          }}
        >
          Forgot Password?
        </Typography>

        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            mt: 4,
            bgcolor: "#e4ccae",
            color: "#000",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { bgcolor: "#d6bb9c" },
          }}
        >
          Login
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
