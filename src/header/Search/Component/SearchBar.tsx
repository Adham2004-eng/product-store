import {
  Box,
  TextField,
  IconButton,
  CircularProgress,
  Typography,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { filterProductsBySearch } from "../Action/SearchAction";
import type { Product } from "../../../body/Home/Request/SetAllproducts";

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await filterProductsBySearch(query);
        setResults(data);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSearch = async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const data = await filterProductsBySearch(query);
      setResults(data);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 1, position: "relative" }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}
      />

      {(loading || results.length > 0 || query.trim()) && (
        <Paper
          elevation={6}
          sx={{
            mt: 1,
            position: "absolute",
            width: "100%",
            maxHeight: 300,
            overflowY: "auto",
            zIndex: 20,
            borderRadius: 2,
            p: 0,
            bgcolor: "background.paper",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
              <CircularProgress size={20} />
            </Box>
          ) : results.length > 0 ? (
            <List disablePadding>
              {results.slice(0, 6).map((product) => (
                <ListItem
                  key={product.id}
                  sx={{
                    borderBottom: "1px solid #ddd",
                    cursor: "pointer",
                    px: 2,
                    py: 1,
                    transition: "background-color 0.25s ease",
                    "&:hover": {
                      bgcolor: "primary.light",
                      color: "primary.contrastText",
                    },
                  }}
                  onClick={() => alert(`You clicked on ${product.title}`)}
                >
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      src={product.image}
                      sx={{ width: 40, height: 40, mr: 2 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography fontSize="0.9rem" fontWeight={600} noWrap>
                        {product.title}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        ${product.price.toFixed(2)}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography
              variant="body2"
              align="center"
              sx={{ color: "text.disabled", py: 2 }}
            >
              No products found.
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;
