import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Loading products...
        </Typography>
      </div>
    );
  }

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <Card
            sx={{
              maxWidth: 345,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
              borderRadius: "15px",
              padding:"10px",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 8px 25px rgba(0,0,0,0.2)",
              },
            }}
          >
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title}
              sx={{
                objectFit: "contain",
                height: 200,
                padding: 2,
                backgroundColor: "#f8f8f8",
              }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {product.description}
              </Typography>
              <Typography
                variant="h6"
                color="black"
                sx={{ mt: 1, fontWeight: "bold" }}
              >
                ${product.price}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
              <Button
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": { backgroundColor: "#333" },
                }}
              >
                Add to Cart
              </Button>
              <Typography
    variant="body2"
    sx={{
      color: product.rating?.count > 0 ? "green" : "red",
      fontWeight: "bold",
      alignSelf: "center",
    }}
  >
    {product.rating?.count > 0 ? "In Stock" : "Out of Stock"}
  </Typography>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductCard;
