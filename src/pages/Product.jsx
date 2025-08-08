import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Grid, Container, Typography } from "@mui/material";

const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        All Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} addToCart={addProduct} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
