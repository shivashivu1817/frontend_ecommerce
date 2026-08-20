import React, { useState, useEffect } from "react";
import API from "../services/api";

function CreateProduct() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {

    try {

      const res = await API.get("products/categories/");
      setCategories(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("products/", {
        name,
        price,
        description,
        category,
      });

      alert("Product Created Successfully");

      setName("");
      setPrice("");
      setDescription("");
      setCategory("");

    } catch (error) {

      console.log(error.response?.data);

      alert("Failed To Create Product");

    }
  };

  return (
    <div className="container mt-4">

      <h2>Create Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          className="form-control mb-2"
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <select
          className="form-control mb-3"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="">
            Select Category
          </option>

          {categories.map((cat) => (
            <option
              key={cat.id}
              value={cat.id}
            >
              {cat.name}
            </option>
          ))}

        </select>

        <button
          className="btn btn-success"
          type="submit"
        >
          Create Product
        </button>

      </form>

    </div>
  );
}

export default CreateProduct;