import { useState, useContext } from "react";
import Axios from "axios";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Validation from "../../auth/Validation";
import { userContext } from "../../App";
import { useUrl } from "../../auth/UrlContext";
const Login = () => {
  const [user, setUser] = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState([]);
  const navigate = useNavigate();
  const url = useUrl();
  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    const err = Validation({ email, password });
    setErrors(err);

    if (err.email === "" && err.password === "") {
      Axios.post(`${url}/auth/login`, {
        email,
        password,
      })
        .then((res) => {
          if (res.data.success) {
            toast.success("Login successfylly", {
              position: "top-right",
              autoClose: 3000,
            });
            localStorage.setItem("token", res.data.token);
            setUser(res.data.isUser);
            console.log(res.data.isUser);
            console.log(res.data.token);
            navigate("/");
          }
        })
        .catch((err) => {
          if (err.response.data.errors) {
            setServerError(err.response.data.errors);
          } else {
            console.log(err);
          }
        });
    }
    console.log(email);
    console.log(password);
  };
  return (
    <div className="container">
      <form className="reg-form" onSubmit={handleSubmit}>
        <h2>Log in</h2>

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
        <button type="submit">Login</button>
        <p>
          Dont have account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
