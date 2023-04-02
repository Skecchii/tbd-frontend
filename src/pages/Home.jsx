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
  margin-top: .75rem;
`;

const CategoryButton = styled.button`
  background-color: transparent;
  margin: 0 1rem;
  border: none;
  font-size: 1rem;
  color: #66fcf1;
  transition: all 0.3s linear;
  border-radius: 0.25rem;
  text-decoration: none;
  position: relative;

  &:hover {
    color: #45a29e;
  }

  &::after {
    content: "";
    display: block;
    position: static;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #66fcf1;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease-in-out;
  }

  &:not(.active):hover::after {
    transform: scaleX(1);
  }

  &.active {
    border-bottom: 2px solid #66fcf1;
    color: #66fcf1;
  }
`;


const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryClick = (category) => setSelectedCategory(category);

  return (
    <main>
      <HeaderContainer>
        {selectedCategory === 'all' ? (
          'Products'
        ) : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
      </HeaderContainer>
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
