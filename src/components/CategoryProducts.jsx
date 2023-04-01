import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByCategory } from "../store/productsSlice";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ProductGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  margin: 1.25rem 0;
`;

const ProductItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const ProductImage = styled.img`
  width: 350px;
  height: 350px;
  object-fit: cover;
`;

const ProductName = styled.h2`
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  text-align: center;
`;

const ProductPrice = styled.p`
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  text-align: center;
`;

const PageNumberContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  overflow: hidden;
  padding-bottom: 0.5rem;
`;

const PageNumberButton = styled.button`
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

const CategoryProducts = ({ selectedCategory }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const [displayedProducts, setDisplayedProducts] = useState([]);

  const productsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getProductsByCategory(selectedCategory));
  }, [dispatch, selectedCategory]);

  useEffect(() => {
    setDisplayedProducts(
      products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
    );
  }, [products, currentPage]);
  
  return (
    <>
      <h2>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h2>
      <ProductGridContainer>
        {displayedProducts.map((product) => (
          <ProductItemContainer key={product._id}>
            <Link to={`/product/${product._id}`}>
              <ProductImage src={product.imageUrl} alt={product.name} />
              <ProductName>{product.name}</ProductName>
            </Link>
            <ProductPrice>${product.price}</ProductPrice>
          </ProductItemContainer>
        ))}
      </ProductGridContainer>
      <PageNumberContainer>
        {Array.from({
          length: Math.ceil(products.length / productsPerPage),
        }).map((_, pageIndex) => (
          <PageNumberButton
            key={pageIndex}
            onClick={() => handlePageChange(pageIndex + 1)}
            className={currentPage === pageIndex + 1 ? "active" : ""}
            disabled={currentPage === pageIndex + 1}
          >
            {pageIndex + 1}
          </PageNumberButton>
        ))}
      </PageNumberContainer>
    </>
  );
};

export default CategoryProducts;
