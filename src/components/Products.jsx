import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import { Link } from "react-router-dom";

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
  const productsPerPage = 12;

  // indexes the first and last products to display on the current page
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  // get the produts to display on the current page
  const displayedProducts = products.slice(firstIndex, lastIndex);

  return (
    <>
      <Link to="/create">
        <button>Create Product</button>
      </Link>
      {displayedProducts.map((product) => (
        <ul key={product._id}>
          <li>
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </li>
          <li>{product.price}</li>
        </ul>
      ))}
      {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map(
        (_, pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => handlePageChange(pageIndex + 1)}
            disabled={currentPage === pageIndex + 1}
          >
            {pageIndex + 1}
          </button>
        )
      )}
    </>
  );
};

export default Products;
