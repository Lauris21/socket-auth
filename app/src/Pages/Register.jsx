import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { registerDB } from "../services/API_Chat/user.service";
import useRegisterError from "../hooks/useRegisterError";

const Register = () => {
  const navigate = useNavigate();

  const [res, setRes] = useState({});
  const [registerOk, setRegisterOk] = useState(false);
  const [hidden, setHidden] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHidden(true);
    setRes(await registerDB(data));
    setHidden(false);
  };

  useEffect(() => {
    useRegisterError(res, setRegisterOk);
  }, [res]);

  if (registerOk) {
    return <Navigate to="/verifyCode" />;
  }
  return (
    <div className="w-50 d-flex flex-column align-items-center gap-5">
      <h1>Register</h1>

      <form className="d-flex flex-column gap-3">
        <input
          type="text"
          id="name"
          placeholder="name"
          autoComplete="false"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
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
          Or <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
