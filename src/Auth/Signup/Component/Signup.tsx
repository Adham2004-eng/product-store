import { Box, Button, TextField, Typography, Stack, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import { handleSignup } from "../Action/GetUserData";
import type { User } from "../Request/SetUserData";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const { register, handleSubmit, reset } = useForm<User>();
  const navigate = useNavigate();

  const onSubmit = async (data: User) => {
    try {
      const newUser = await handleSignup(data);
      
 
      console.log("User stored in localStorage:", newUser);
      console.log("All users:", JSON.parse(localStorage.getItem("dijavo_users") || "[]"));

      alert("User created successfully!");
      reset(); 
    } catch (error) {
      alert("Signup failed.");
      console.error("Error during signup:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h5" mb={2} textAlign="center">Sign Up</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField label="Email" {...register("email")} required />
          <TextField label="Username" {...register("username")} required />
          <TextField label="Password" type="password" {...register("password")} required />
          <Button onClick={() => navigate("/login")} variant="contained" type="submit" color="primary">Register</Button>
        </Stack>
      </form>
      <Typography mt={2} textAlign="center">
        Already have an account?{" "}
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate("/login")}
          sx={{ cursor: "pointer" }}
        >
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default SignupForm;
