import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import { handleLogin } from "../Action/GetLogin";
import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    const loggedUser = await handleLogin({
      email: data.email,
      password: data.password,
    });

    if (loggedUser) {
      setError("");
      localStorage.removeItem("dijavo_loggedin");
      localStorage.setItem("dijavo_loggedin", JSON.stringify(loggedUser));
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>

      <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
        Don't have an account?{" "}
        <Link
          component={RouterLink} 
          to="/signup"
          underline="hover"
          sx={{ fontWeight: "bold", cursor: "pointer" }}
        >
          Sign up
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
