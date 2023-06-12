import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/userContext";
import { loginUser } from "../services/API_Chat/user.service";
import useLoginError from "../hooks/useLoginError";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [res, setRes] = useState({});
  const [hidden, setHidden] = useState(false);
  const [loginOk, setLoginOk] = useState(false);

  const { userLogin } = useAuth();

  const handleSubmit = async (e) => {
    console.log("entro");
    e.preventDefault();
    setHidden(true);
    setRes(await loginUser(data));
    setHidden(false);
  };

  useEffect(() => {
    console.log(res);
    useLoginError(res, setLoginOk, userLogin);
  }, [res]);

  if (loginOk) {
    if (res.data.user.check == false) {
      return <Navigate to="/verifyCode" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-8 justify-center items-center">
      <h1 className="text-4xl font-semibold drop-shadow-[11px_-3px_4px_rgba(0,180,219,0.28)] mb-8">
        Login
      </h1>

      <form className="shadow-md rounded px-8 pt-6 pb-8 flex flex-col gap-4 items-center">
        <label htmlFor="email"></label>
        <input
          className="w-56 shadow appearance-none border rounded py-2 px-3 text-darkGray leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          id="email"
          placeholder="email"
          autoComplete="false"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label htmlFor="password"></label>
        <input
          className="w-56 shadow appearance-none border rounded py-2 px-3 text-darkGray leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          id="password"
          placeholder="password"
          autoComplete="false"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </form>
      <div className="d-flex flex-column gap-3">
        <button
          disabled={hidden}
          type="button"
          className="bg-lightBlue hover:bg-darkBlue text-darkGray hover:text-lightGray font-bold py-2 px-4 rounded-2xl m-6"
          onClick={(e) => handleSubmit(e)}
        >
          Enviar
        </button>
        <p className="text-sm text-center">
          Or{" "}
          <Link to="/register" className="text-lightBlue text-lg">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
