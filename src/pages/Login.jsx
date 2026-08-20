import React, { useState } from "react";
import API from "../services/api";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "token/",
        {
          username,
          password,
        }
      );

      localStorage.setItem(
        "access",
        response.data.access
      );

      localStorage.setItem(
        "refresh",
        response.data.refresh
      );

      alert("Login Success");

      window.location.href = "/";

    } catch (error) {

      alert("Invalid Login");

    }
  };

  return (
    <div className="container mt-5">

      <div
        className="card p-4 mx-auto"
        style={{ maxWidth: "400px" }}
      >

        <h3>Login</h3>

        <form onSubmit={loginUser}>

          <input
            className="form-control mb-3"
            placeholder="Username"
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button className="btn btn-primary">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;