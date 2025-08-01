import {
  Avatar,
  IconButton,
  Popover,
  Typography,
  Button,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  email: string;
  username: string;
};

const Profile = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const user: User | null = JSON.parse(
    localStorage.getItem("dijavo_loggedin") || "null"
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("dijavo_loggedin");
    handleClose();
    window.location.reload();
  };

  const open = Boolean(anchorEl);

  if (!user) {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/login")}
        sx={{
          textTransform: "none",
          fontWeight: "bold",
          borderRadius: 2,
        }}
      >
        Login
      </Button>
    );
  }

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <Avatar
          alt="Profile"
          sx={{
            width: 36,
            height: 36,
            bgcolor: "#1976d2",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {user.username?.[0]?.toUpperCase() || "?"}
        </Avatar>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 3,
            borderRadius: 3,
            width: 280,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#1e1e1e",
            color: "#fff",
          },
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Avatar
            sx={{
              width: 60,
              height: 60,
              bgcolor: "#2196f3",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {user.username?.[0]?.toUpperCase() || "?"}
          </Avatar>

          <Typography variant="h6" fontWeight="bold">
            {user.username}
          </Typography>

          <Typography variant="body2" color="gray">
            {user.email}
          </Typography>

          <Divider sx={{ width: "100%", borderColor: "#444" }} />

          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleLogout}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: 2,
              borderColor: "#f44336",
              color: "#f44336",
              "&:hover": {
                backgroundColor: "#2c2c2c",
              },
            }}
          >
            Logout
          </Button>
        </Stack>
      </Popover>
    </Box>
  );
};

export default Profile;
