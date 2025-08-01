import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Badge,
  Popover,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Man as ManIcon,
  Woman as WomanIcon,
  Diamond as DiamondIcon,
  Devices as DevicesIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  ContactPage as ContactIcon,
  Info as InfoIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import UserProfile from "../profile/profile";
import SearchBar from "../Search/Component/SearchBar";

const DijavoAppBar = () => {
  const [productAnchor, setProductAnchor] = useState<null | HTMLElement>(null);
  const [cartCount, setCartCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("dijavo_loggedin") || "null");
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("dijavo_cart") || "[]");
    setCartCount(cartItems.length);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const handleProductOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProductAnchor(event.currentTarget);
  };

  const handleProductClose = () => {
    setProductAnchor(null);
  };

  const navigateTo = (path: string) => {
    handleProductClose();
    navigate(path);
    setDrawerOpen(false);
  };

  const menuData = [
    { label: "Men", icon: <ManIcon sx={{ color: "#FF3C38" }} />, path: "/MensClothes" },
    { label: "Women", icon: <WomanIcon sx={{ color: "#FF3C38" }} />, path: "/WomensClothes" },
    { label: "Jewelry", icon: <DiamondIcon sx={{ color: "#FF3C38" }} />, path: "/Jewelery" },
    { label: "Electronics", icon: <DevicesIcon sx={{ color: "#FF3C38" }} />, path: "/Electronics" },
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#000" }}>
        <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
          <Typography
            component={Link}
            to="/"
            sx={{
              fontWeight: "bold",
              fontSize: "1.8rem",
              color: "#FF3C38",
              textDecoration: "none",
              '&:hover': { color: "#FF6B6B" },
            }}
          >
            Dijavo
          </Typography>

          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: "#fff" }}>
              <MenuIcon />
            </IconButton>
          )}

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button component={Link} to="/" sx={{ color: "#fff", fontWeight: 500, '&:hover': { color: "#FF3C38" } }}>
                Home
              </Button>
              <Button
                onMouseEnter={handleProductOpen}
                endIcon={<ArrowDropDownIcon />}
                sx={{ color: "#fff", fontWeight: 500, '&:hover': { color: "#FF3C38" } }}
              >
                Products
              </Button>
              <Button component={Link} to="/contact" sx={{ color: "#fff", fontWeight: 500, '&:hover': { color: "#FF3C38" } }}>
                Contact Us
              </Button>
              <Button component={Link} to="/about" sx={{ color: "#fff", fontWeight: 500, '&:hover': { color: "#FF3C38" } }}>
                About Us
              </Button>
            </Box>
          )}

          {!isMobile && <SearchBar />}

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {user && (
              <IconButton component={Link} to="/cart" sx={{ color: "#FF3C38" }}>
                <Badge badgeContent={cartCount} color="error" overlap="rectangular">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}
            <UserProfile />
          </Box>
        </Toolbar>
      </AppBar>

      <Popover
        open={Boolean(productAnchor)}
        anchorEl={productAnchor}
        onClose={handleProductClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        PaperProps={{
          sx: {
            mt: 1,
            backgroundColor: "#111",
            padding: 2,
            display: "flex",
            gap: 4,
            color: "#fff",
            borderRadius: 2,
          },
        }}
        onMouseLeave={handleProductClose}
      >
        {menuData.map((item) => (
          <Button
            key={item.label}
            onClick={() => navigateTo(item.path)}
            startIcon={item.icon}
            sx={{
              color: "#fff",
              fontWeight: 500,
              textTransform: "none",
              justifyContent: "flex-start",
              "&:hover": {
                color: "#FF3C38",
                backgroundColor: "#222",
              },
            }}
          >
            {item.label}
          </Button>
        ))}
      </Popover>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, backgroundColor: "#000", height: "100%", color: "#fff" }}>
          <List>
            <ListItem sx={{ px: 2, pt: 1 }}>
              <SearchBar />
            </ListItem>

            <Divider sx={{ backgroundColor: "#333" }} />

            <ListItem  onClick={() => navigateTo("/")}>
              <ListItemIcon>
                <HomeIcon sx={{ color: "#FF3C38" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>

            <ListItem  onClick={() => setMobileProductOpen(!mobileProductOpen)}>
              <ListItemIcon>
                <ArrowDropDownIcon sx={{ color: "#FF3C38" }} />
              </ListItemIcon>
              <ListItemText primary="Products" />
              {mobileProductOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={mobileProductOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {menuData.map((item) => (
                  <ListItem
                    key={item.label}
                    
                    onClick={() => navigateTo(item.path)}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
              </List>
            </Collapse>

            <Divider sx={{ backgroundColor: "#333" }} />

            <ListItem  onClick={() => navigateTo("/contact")}>
              <ListItemIcon>
                <ContactIcon sx={{ color: "#FF3C38" }} />
              </ListItemIcon>
              <ListItemText primary="Contact Us" />
            </ListItem>

            <ListItem  onClick={() => navigateTo("/about")}>
              <ListItemIcon>
                <InfoIcon sx={{ color: "#FF3C38" }} />
              </ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default DijavoAppBar;
