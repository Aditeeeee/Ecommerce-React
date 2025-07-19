import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigation } from "react-router-dom";
import * as Yup from "yup";
import { clearErrors, registerUser } from "../../redux/authSlice";
import type { AppDispatch, RootState } from "../../redux/store";

interface RegisterFormProps {
  setIsLogin: (open: boolean) => void;
}

const RegisterForm = ({ setIsLogin }: RegisterFormProps) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const dispatch = useDispatch<AppDispatch>();

  const error = useSelector(
    (state: RootState) => state.auth?.error?.registerError
  );

  const registerFormik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmpass: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmpass: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async ({ username, email, password }) => {
      const userId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
      const result = await dispatch(
        registerUser({ userId, username, email, password })
      );
      if (registerUser.fulfilled.match(result)) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    },
  });
  return (
    <>
      <Box mt={4} mb={1} textAlign="center">
        <Typography variant="h5" fontWeight={700}>
          SignUp
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" gap={1} textAlign="center">
        <Typography variant="body2">or</Typography>
        <Typography
          variant="body2"
          color="#e4ccae"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            setIsLogin(true);
            dispatch(clearErrors());
          }}
        >
          login to your existing account
        </Typography>
      </Box>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Form
        onSubmit={registerFormik.handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <TextField
          name="username"
          label="Name"
          variant="outlined"
          size="small"
          fullWidth
          onChange={registerFormik.handleChange}
          onBlur={registerFormik.handleBlur}
          value={registerFormik.values.username}
          error={
            registerFormik.touched.username &&
            Boolean(registerFormik.errors.username)
          }
          helperText={
            registerFormik.touched.username && registerFormik.errors.username
          }
        />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          size="small"
          fullWidth
          onChange={registerFormik.handleChange}
          onBlur={registerFormik.handleBlur}
          value={registerFormik.values.email}
          error={
            registerFormik.touched.email && Boolean(registerFormik.errors.email)
          }
          helperText={
            registerFormik.touched.email && registerFormik.errors.email
          }
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          size="small"
          fullWidth
          onChange={registerFormik.handleChange}
          onBlur={registerFormik.handleBlur}
          value={registerFormik.values.password}
          error={
            registerFormik.touched.password &&
            Boolean(registerFormik.errors.password)
          }
          helperText={
            registerFormik.touched.password && registerFormik.errors.password
          }
        />
        <TextField
          name="confirmpass"
          label="Confirm Password"
          type="password"
          variant="outlined"
          size="small"
          fullWidth
          onChange={registerFormik.handleChange}
          onBlur={registerFormik.handleBlur}
          value={registerFormik.values.confirmpass}
          error={
            registerFormik.touched.confirmpass &&
            Boolean(registerFormik.errors.confirmpass)
          }
          helperText={
            registerFormik.touched.confirmpass &&
            registerFormik.errors.confirmpass
          }
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            mt: 2,
            bgcolor: "#e4ccae",
            color: "#000",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { bgcolor: "#d6bb9c" },
          }}
          disabled={isSubmitting}
        >
          Continue
        </Button>
      </Form>
    </>
  );
};

export default RegisterForm;
