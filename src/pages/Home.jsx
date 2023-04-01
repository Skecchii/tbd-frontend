import { useState } from "react";
import Products from "../components/Products";
import CategoryProducts from "../components/CategoryProducts";

import styled from "styled-components";

const HeaderContainer = styled.h2`
  display: flex;
  justify-content: center;
`;

const CategoriesContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const CategoryButton = styled.button`
  margin: 0 5px;
`;

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryClick = (category) => setSelectedCategory(category);

  return (
    <main>
      <HeaderContainer>Products</HeaderContainer>
      <CategoriesContainer>
        <CategoryButton onClick={() => handleCategoryClick("all")}>All</CategoryButton>
        <CategoryButton onClick={() => handleCategoryClick("engine")}>Engine</CategoryButton>
        <CategoryButton onClick={() => handleCategoryClick("transmission")}>Transmission</CategoryButton>
        <CategoryButton onClick={() => handleCategoryClick("suspension")}>Suspension</CategoryButton>
        <CategoryButton onClick={() => handleCategoryClick("brakes")}>Brakes</CategoryButton>
        <CategoryButton onClick={() => handleCategoryClick("exhaust")}>Exhaust</CategoryButton>
        <CategoryButton onClick={() => handleCategoryClick("interior")}>Interior</CategoryButton>
        <CategoryButton onClick={() => handleCategoryClick("exterior")}>Exterior</CategoryButton>
      </CategoriesContainer>
      {selectedCategory === "all" ? (
        <Products />
      ) : (
        <>
          <CategoryProducts selectedCategory={selectedCategory} />
        </>
      )}
    </main>
  );
};

export default Home;
