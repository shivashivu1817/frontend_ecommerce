import React, { useState } from "react";
import API from "../services/api";

function CreateCategory() {

  const [name, setName] = useState("");

  const createCategory = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "products/categories/",
        {
          name: name,
        }
      );

      alert(
        "Category Created Successfully"
      );

      setName("");

    } catch (error) {

      console.log(error);

      alert(
        "Failed To Create Category"
      );

    }

  };

  return (

    <div className="container mt-5">

      <div className="card p-4">

        <h2>Create Category</h2>

        <form onSubmit={createCategory}>

          <div className="mb-3">

            <label>
              Category Name
            </label>

            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Create Category
          </button>

        </form>

      </div>

    </div>

  );
}

export default CreateCategory;