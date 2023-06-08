import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-50 d-flex flex-column align-items-center gap-5">
      <h1>Login</h1>

      <form className="d-flex flex-column gap-3">
        <input
          type="email"
          id="email"
          placeholder="email"
          autoComplete="false"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          autoComplete="false"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </form>
      <div className="d-flex flex-column gap-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => handleSubmit(e)}
        >
          Enviar
        </button>
        <p>
          Or <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
