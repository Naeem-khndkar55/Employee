import React, { useState } from "react";
import Axios from "axios";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Validation from "../../auth/Validation";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState([]);
  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    const err = Validation({ name, email, password });
    setErrors(err);

    if (err.name === "" && err.email === "" && err.password === "") {
      Axios.post("http://localhost:3002/auth/register", {
        name,
        email,
        password,
      })
        .then((res) => {
          if (res.data.success) {
            toast.success("Account Created successfylly", {
              position: "top-right",
              autoClose: 3000,
            });

            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err.response.data.errors);
          if (err.response.data.errors) {
            setServerError(err.response.data.errors);
          } else {
            console.log(err);
          }
        });
    }
    console.log(name);
    console.log(email);
    console.log(password);
  };
  return (
    <div className="container">
      <form className="reg-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          placeholder="Your name"
          onChange={(e) => setname(e.target.value)}
        />
        {errors.name && <span className="error">{errors.name}</span>}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          autoComplete="off"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span className="error">{errors.password}</span>}

        {serverError.length > 0 &&
          serverError.map((error, index) => {
            return (
              <p className="error" key={index}>
                {error.msg}
              </p>
            );
          })}
        <button type="submit">Register</button>
        <p>
          already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
