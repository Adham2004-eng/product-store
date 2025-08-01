
import {
  Box,
  Container,
  Typography,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import { Facebook, Instagram, Twitter, GitHub } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #0f0f0f, #1f1f1f)",
        color: "#fff",
        pt: 6,
        pb: 4,
        mt: 10,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "center", md: "flex-start" }}
          spacing={4}
        >
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              🛒 Dijavo
            </Typography>
            <Typography variant="body2" color="gray">
              Premium online shopping experience.
            </Typography>
          </Box>

          <Stack spacing={1} textAlign={{ xs: "center", md: "left" }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Explore
            </Typography>
            <Typography variant="body2">Men</Typography>
            <Typography variant="body2">Women</Typography>
            <Typography variant="body2">Electronics</Typography>
            <Typography variant="body2">Jewelry</Typography>
          </Stack>

          <Stack spacing={1} textAlign={{ xs: "center", md: "left" }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Support
            </Typography>
            <Typography variant="body2">Help Center</Typography>
            <Typography variant="body2">Terms of Service</Typography>
            <Typography variant="body2">Privacy Policy</Typography>
            <Typography variant="body2">Contact Us</Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton sx={{ color: "#fff" }}>
              <Facebook />
            </IconButton>
            <IconButton sx={{ color: "#fff" }}>
              <Instagram />
            </IconButton>
            <IconButton sx={{ color: "#fff" }}>
              <Twitter />
            </IconButton>
            <IconButton sx={{ color: "#fff" }}>
              <GitHub />
            </IconButton>
          </Stack>
        </Stack>

        <Divider sx={{ my: 4, borderColor: "#444" }} />

        <Typography
          variant="body2"
          textAlign="center"
          color="gray"
          sx={{ fontSize: "0.8rem" }}
        >
          © {new Date().getFullYear()} Dijavo. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
