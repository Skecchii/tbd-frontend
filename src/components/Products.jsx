import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
const CreateButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CreateButton = styled.button`
  display: flex;
  justify-content: center;
  color: #fff;
  width: 12rem;
  background-color: #45a29e;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    background-color: #66fcf1;
    color: #0b0c10;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // indexes the first and last products to display on the current page
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  // get the produts to display on the current page
  const displayedProducts = products.slice(firstIndex, lastIndex);

  return (
    <>
      <CreateButtonContainer>
        <CreateButton>
          <Link to="/create">Create Product</Link>
        </CreateButton>
      </CreateButtonContainer>
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

export default Products;
