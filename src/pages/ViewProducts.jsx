import React, { useEffect, useState } from "react";
import API from "../services/api";

function ViewProducts() {
  const [products, setProducts] = useState([]);

  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("products/");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await API.delete(`products/${id}/`);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const startEdit = (product) => {
    setEditId(product.id);

    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      stock: product.stock || "",
      category: product.category || "",   // 🔥 IMPORTANT FIX
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProduct = async (id) => {
    try {
      console.log("Sending Data:", formData);

      await API.put(`products/${id}/`, formData);

      setEditId(null);
      fetchProducts();

      alert("Product Updated Successfully");
    } catch (error) {
      console.log("Backend Error:", error.response?.data);
      alert("Update Failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>View Products</h2>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>

              {/* NAME */}
              <td>
                {editId === product.id ? (
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                ) : (
                  product.name
                )}
              </td>

              {/* DESCRIPTION */}
              <td>
                {editId === product.id ? (
                  <input
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                ) : (
                  product.description
                )}
              </td>

              {/* PRICE */}
              <td>
                {editId === product.id ? (
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                ) : (
                  `₹ ${product.price}`
                )}
              </td>

              {/* STOCK */}
              <td>
                {editId === product.id ? (
                  <input
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                  />
                ) : (
                  product.stock
                )}
              </td>

              {/* CATEGORY */}
              <td>{product.category_name}</td>

              {/* ACTION */}
              <td>
                {editId === product.id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => updateProduct(product.id)}
                    >
                      Save
                    </button>

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => startEdit(product)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewProducts;