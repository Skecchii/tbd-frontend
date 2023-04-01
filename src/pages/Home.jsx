import React from "react";
import Products from "../components/Products";
import ProductsCategory from "../components/ProductsCategory";

import styled from "styled-components"

const HeaderContainer = styled.h2`
  display: flex;
  justify-content: center;
`

const Home = () => {
  return (
    <main>
      <HeaderContainer>Featured Items</HeaderContainer>
      <Products />
      <HeaderContainer>Shop by Categories</HeaderContainer>
      <ProductsCategory/>
    </main>
  );
};

export default Home;
