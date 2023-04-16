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
  margin: 0.25rem 1rem;
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
      <CategoriesContainer>
        <CategoryButton onClick={() => handleCategoryClick("all")} className={selectedCategory === 'all' ? 'active' : ''}>All</CategoryButton>
        <CategoryButton onClick={() => handleCategoryClick("kissCut")} className={selectedCategory === 'kissCut' ? 'active' : ''}>Kiss Cut</CategoryButton>
        <CategoryButton onClick={() => handleCategoryClick("peeker")} className={selectedCategory === 'peeker' ? 'active' : ''}>Peeker</CategoryButton>
        <CategoryButton onClick={() => handleCategoryClick("boxSlap")} className={selectedCategory === 'boxSlap' ? 'active' : ''}>Box Slap</CategoryButton>
      </CategoriesContainer>
      <HeaderContainer>
        {selectedCategory === 'all' ? (
          'Products'
        ) : selectedCategory.split(/(?=[A-Z])/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
      </HeaderContainer>
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