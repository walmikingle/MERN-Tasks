import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

// Use Vite's development proxy when no deployment URL is configured. This keeps
// the browser on the same origin and avoids a CORS failure during local development.
const API_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

const initialFormData = {
  name: "",
  price: "",
  category: "",
};

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initialFormData);
  const [editingId, setEditingId] = useState(null);

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
  };

  useEffect(() => {
    let isMounted = true;

    axios
      .get(`${API_URL}/products`)
      .then((response) => {
        if (isMounted) {
          setProducts(Array.isArray(response.data) ? response.data : []);
        }
      })
      .catch((requestError) => {
        console.error("Failed to fetch products:", requestError);
        if (isMounted) {
          setError("Failed to load products");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      alert("Product name is required");
      return;
    }

    if (!formData.price || Number(formData.price) <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    if (!formData.category.trim()) {
      alert("Category is required");
      return;
    }

    try {
      const productData = {
        name: formData.name.trim(),
        price: Number(formData.price),
        category: formData.category.trim(),
      };

      if (editingId) {
        const response = await axios.put(
          `${API_URL}/products/${editingId}`,
          productData
        );

        setProducts((previousProducts) =>
          previousProducts.map((product) =>
            product._id === editingId ? response.data : product
          )
        );
      } else {
        const response = await axios.post(`${API_URL}/products`, productData);

        setProducts((previousProducts) => [
          ...previousProducts,
          response.data,
        ]);
      }

      resetForm();
    } catch (error) {
      console.error("Failed to save product:", error);
      setError("Failed to save product");
    }
  };

  const editProduct = (product) => {
    setEditingId(product._id);

    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
    });

    setError("");
  };

  const cancelEdit = () => {
    resetForm();
    setError("");
  };

  const deleteProduct = async (id) => {
    try {
      setError("");

      await axios.delete(`${API_URL}/products/${id}`);

      setProducts((previousProducts) =>
        previousProducts.filter((product) => product._id !== id)
      );

      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
      setError("Failed to delete product");
    }
  };

  return (
    <div className="app">
      <h1>Product Store</h1>

      {error && <p className="error-message">{error}</p>}

      <ProductForm
        formData={formData}
        editingId={editingId}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelEdit={cancelEdit}
      />

      <div className="products-section">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <ProductList
            products={products}
            editProduct={editProduct}
            deleteProduct={deleteProduct}
          />
        )}
      </div>
    </div>
  );
}

export default App;
