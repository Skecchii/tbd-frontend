import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateExistingProduct } from "../store/productsSlice";
import { useNavigate, useParams } from "react-router-dom";

function ProductEdit() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const product = products.find((product) => product._id === productId);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    imageUrl: "",
    relatedProduct: [],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        imageUrl: product.imageUrl,
        relatedProduct: product.relatedProduct,
      });
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateExistingProduct({productId, productData: formData}));
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "",
      imageUrl: "",
      relatedProduct: [],
    });
    setTimeout(() => navigate(`/product/${productId}`), 150);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="price">Price</label>
      <input
        type="number"
        id="price"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label htmlFor="category">Category</label>
      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value="">--Select a category--</option>
        <option value="engine">Engine</option>
        <option value="transmission">Transmission</option>
        <option value="suspension">Suspension</option>
        <option value="brakes">Brakes</option>
        <option value="exhaust">Exhaust</option>
        <option value="interior">Interior</option>
        <option value="exterior">Exterior</option>
      </select>

      <label htmlFor="imageUrl">Image URL</label>
      <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        required
      />

      <button type="submit">Update Product</button>
    </form>
  );
}

export default ProductEdit;
