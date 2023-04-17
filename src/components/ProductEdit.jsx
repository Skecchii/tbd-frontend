import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateExistingProduct, uploadImage } from "../store/productsSlice";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 50rem;
`

const Label = styled.label`
  color: #fff;
  font-size: 1rem;
`;

const Input = styled.input`
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
`;

const Textarea = styled.textarea`
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1rem;
  height: 200px;
  width: 100%;
  resize: vertical;
`;

const Select = styled.select`
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #f0f0f0;
  color: #333;
  width: 100%;
`;

const Option = styled.option`
  background-color: #f0f0f0;
  color: #333;
  transition: 0.2s;
  &:hover {
    background-color: #66fcf1;
    color: #000;
    cursor: pointer;
  }
`;

const Button = styled.button`
  background-color: #1f2833;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: #66fcf1;
    color: #333;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #1f2833;
  background-color: #1f2833;
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    color: #66fcf1;
  }
`;

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

  const [newImage, setNewImage] = useState(null)

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
    if (newImage) {
      formData.imageUrl = newImage;
      dispatch(updateExistingProduct({ productId, productData: formData }))
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "",
        imageUrl: "",
        relatedProduct: [],
      });
      setNewImage(null)
      console.log(formData)
      setTimeout(() => navigate(`/product/${productId}`), 250);
    } else {
      dispatch(updateExistingProduct({ productId, productData: formData }));
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "",
        imageUrl: "",
        relatedProduct: [],
      });
      setTimeout(() => navigate(`/product/${productId}`), 250);
    }
  };

  const handleChange = async (e) => {
    if (e.target.name === "imageUrl") {
      const file = e.target.files[0];
      const newFormData = new FormData();
      newFormData.append('imageUrl', file);
      const response = await dispatch(uploadImage(newFormData))
      setNewImage(response.payload)
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };


  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <Label htmlFor="category">Category</Label>
          <Select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <Option value="">--Select a category--</Option>
            <Option value="kissCut">Kiss Cut</Option>
            <Option value="peeker">Peeker</Option>
            <Option value="boxSlap">Box Slap</Option>
          </Select>

          <Label htmlFor="imageUrl">Image</Label>
          {formData.imageUrl ? (
            <div>
              <Img src={formData.imageUrl} alt={formData.name} />
              <label htmlFor="imageUrl">Change Image</label>
              <Input
                type="file"
                id="imageUrl"
                name="imageUrl"
                onChange={handleChange}
                style={{ display: "none" }}
              />
            </div>
          ) : (
            <Input
              type="file"
              id="imageUrl"
              name="imageUrl"
              onChange={handleChange}
            />
          )}
        </FormGroup>
        <div>
          <Button type="submit">Update Product</Button>
          <StyledLink to={`/product/${productId}`}>Cancel</StyledLink>
        </div>
      </FormContainer>
    </>
  );
}

export default ProductEdit;