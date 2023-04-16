import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteExistingProduct } from "../store/productsSlice";
import { useParams, useNavigate, Link } from "react-router-dom";
import { addItem } from "../store/cartSlice"

import styled from "styled-components"

const Img = styled.img`
  max-width: 100%;
  max-height: 50rem;
`

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const product = products.find((product) => product._id === productId);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(deleteExistingProduct(productId))
    setTimeout(() => navigate("/"), 150)
  }

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  return (
    <main>
      <>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Price: {product.price}</p>
        <p>Category: {product.category}</p>
        <Img src={product.imageUrl} alt={product.name} />
        <Link to={`/product/${product._id}/edit`}>
          <button>Edit</button>
        </Link>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </>
    </main>
  );
}

export default ProductDetail;