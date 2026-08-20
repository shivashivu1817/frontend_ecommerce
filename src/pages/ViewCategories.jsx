import React, { useEffect, useState } from "react";
import API from "../services/api";

function ViewCategories() {
  const [categories, setCategories] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await API.get("products/categories/");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete Category?")) return;

    try {
      await API.delete(`products/categories/${id}/`);
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  // 👉 Start edit
  const startEdit = (cat) => {
    setEditId(cat.id);
    setEditName(cat.name);
  };

  // 👉 Save update
  const updateCategory = async (id) => {
    try {
      await API.put(`products/categories/${id}/`, {
        name: editName,
      });

      setEditId(null);
      setEditName("");
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Categories</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>

              {/* 👉 EDIT MODE */}
              <td>
                {editId === cat.id ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  cat.name
                )}
              </td>

              <td>
                {editId === cat.id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => updateCategory(cat.id)}
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
                      onClick={() => startEdit(cat)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteCategory(cat.id)}
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

export default ViewCategories;