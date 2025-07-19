import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-router-dom";
import * as Yup from "yup";
import { updatePassword } from "../../redux/authSlice";
import type { AppDispatch, RootState } from "../../redux/store";

interface ForgetFormProps {
  setIsForgot: (open: boolean) => void;
}

const ForgetPassForm = ({ setIsForgot }: ForgetFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const error = useSelector((state: RootState) => state.auth.error.forgetError);

  const forgetFormik = useFormik({
    initialValues: {
      email: "",
      newpassword: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      newpassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
      confirmpassword: Yup.string()
        .oneOf([Yup.ref("newpassword")], "Passwords do not match")
        .required("Confirm your new password"),
    }),
    onSubmit: async ({ email, newpassword }) => {
      const result = await dispatch(updatePassword({ email, newpassword }));
      if (updatePassword.fulfilled.match(result)) {
        setIsForgot(false);
      } else {
        setIsForgot(true);
      }
    },
  });

  return (
    <>
      <Box mt={4} mb={1} textAlign="center">
        <Typography variant="h5" fontWeight={700}>
          Reset Password
        </Typography>
      </Box>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Form
        onSubmit={forgetFormik.handleSubmit}
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
          onChange={forgetFormik.handleChange}
          onBlur={forgetFormik.handleBlur}
          value={forgetFormik.values.email}
          error={
            forgetFormik.touched.email && Boolean(forgetFormik.errors.email)
          }
          helperText={forgetFormik.touched.email && forgetFormik.errors.email}
        />
        <TextField
          name="newpassword"
          label="New Password"
          type="password"
          variant="outlined"
          size="small"
          fullWidth
          onChange={forgetFormik.handleChange}
          onBlur={forgetFormik.handleBlur}
          value={forgetFormik.values.newpassword}
          error={
            forgetFormik.touched.newpassword &&
            Boolean(forgetFormik.errors.newpassword)
          }
          helperText={
            forgetFormik.touched.newpassword && forgetFormik.errors.newpassword
          }
        />
        <TextField
          name="confirmpassword"
          label="Confirm Password"
          type="password"
          variant="outlined"
          size="small"
          fullWidth
          onChange={forgetFormik.handleChange}
          onBlur={forgetFormik.handleBlur}
          value={forgetFormik.values.confirmpassword}
          error={
            forgetFormik.touched.confirmpassword &&
            Boolean(forgetFormik.errors.confirmpassword)
          }
          helperText={
            forgetFormik.touched.confirmpassword &&
            forgetFormik.errors.confirmpassword
          }
        />
        <Button
          type="submit"
          variant="contained"
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
          Reset Password
        </Button>
      </Form>
    </>
  );
};

export default ForgetPassForm;
