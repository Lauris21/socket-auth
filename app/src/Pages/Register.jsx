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
    <div className="w-screen h-screen flex flex-col gap-10 content-center items-center">
      <h2 className="text-3xl font-semibold">Register</h2>

      <form className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 flex flex-col gap-10">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="name"
          placeholder="name"
          autoComplete="false"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          id="email"
          placeholder="email"
          autoComplete="false"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
