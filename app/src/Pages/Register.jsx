import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerDB } from "../services/API_Chat/user.service";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerDB(data);
    navigate("/login");
  };
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="w-50 d-flex flex-column align-items-center gap-5">
      <h1>Register</h1>

      <div className="d-flex flex-column gap-3">
        <input
          type="text"
          id="name"
          placeholder="name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </div>
      <div className="d-flex flex-column gap-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => handleSubmit(e)}
        >
          Enviar
        </button>
        <p>
          Or <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
