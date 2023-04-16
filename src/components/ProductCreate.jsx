import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewProduct, uploadImage } from "../store/productsSlice";
import { useNavigate } from "react-router-dom";

function ProductCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    imageUrl: "",
    relatedProduct: [],
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await dispatch(createNewProduct(formData));
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "",
        imageUrl: "",
        relatedProduct: [],
      });
      setTimeout(() => navigate("/"), 150);
    } catch (err) {
      console.error(`failed to submit new product, ${err}`);
    }
  };

  const handleChange = async (e) => {
    try {
      if (e.target.name === "imageUrl") {
        const file = e.target.files[0];
        const newFormData = new FormData();
        newFormData.append('imageUrl', file);
        const response = await dispatch(uploadImage(newFormData))
        setFormData({ ...formData, imageUrl: response.payload })
      } else {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
    } catch (err) {
      console.error(`failed to change formData, ${err}`);
    }
  };

  return (
    <>
      <button onClick={() => console.log(`current FormData: ${JSON.stringify(formData)}`)}>check data</button>
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
          <option value="kissCut">Kiss Cut</option>
          <option value="peeker">Peeker</option>
          <option value="boxSlap">Box Slap</option>
        </select>

        <label htmlFor="imageUrl">Upload Image</label>
        <input
          type="file"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        />

        <button type="submit">Create Product</button>
      </form>
    </>

  );
}

export default ProductCreate;