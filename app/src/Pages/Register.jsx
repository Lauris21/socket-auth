import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { registerDB } from "../services/API_Chat/user.service";
import useRegisterError from "../hooks/useRegisterError";
import { useAuth } from "../context/userContext";
import useWidth from "../hooks/useWidth";
import AnimationHome from "../components/UI/AnimationHome";

const Register = () => {
  const { bridgeData } = useAuth();
  const [res, setRes] = useState({});
  const [registerOk, setRegisterOk] = useState(false);
  const [hidden, setHidden] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const {width} = useWidth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHidden(true);
    setRes(await registerDB(data));
    setHidden(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useRegisterError(res, setRegisterOk);
    bridgeData("REGISTER_USER");
  }, [res]);

  if (registerOk) {
    return <Navigate to="/verifyCode" />;
  }
  return (
    <>
    {width < 768 ? (<div className="w-screen h-screen flex flex-col gap-8 justify-center items-center">
      <h2 className="text-4xl font-semibold drop-shadow-[11px_-3px_4px_rgba(0,180,219,0.28)]">
        Register
      </h2>

      <form className="shadow-md rounded px-8 pt-6 pb-8 flex flex-col gap-4 items-center">
        <label htmlFor="name"></label>
        <input
          className="w-56 shadow appearance-none border rounded py-2 px-3 text-darkGray leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="name"
          placeholder="name"
          autoComplete="false"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
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
        <button
          type="button"
          className="bg-lightBlue hover:bg-darkBlue text-darkGray hover:text-lightGray font-bold py-2 px-4 rounded-2xl m-6"
          disabled={hidden}
          onClick={(e) => handleSubmit(e)}
        >
          Enviar
        </button>
        <p className="bottom-text">
          <small>
            By clicking the Sign Up button, you agree to our{" "}
            <Link className="text-lightBlue">Terms & Conditions</Link> and{" "}
            <Link className="text-lightBlue">Privacy Policy</Link>.
          </small>
        </p>
      </form>
      <div className="d-flex flex-column gap-3">
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-lightBlue text-lg">
            Login
          </Link>
        </p>
      </div>
    </div>) :( <div className="w-screen h-screen flex flex-col justify-between items-center">
    <div className="mt-20 md:mt-32">
      <h2 className="text-4xl font-semibold drop-shadow-[11px_-3px_4px_rgba(0,180,219,0.28)] mb-8 text-center">
        Register
      </h2>

      <form className="shadow-md rounded px-8 pt-6 pb-8 flex flex-col gap-4 items-center">
        <label htmlFor="name"></label>
        <input
          className="w-56 shadow appearance-none border rounded py-2 px-3 text-darkGray leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="name"
          placeholder="name"
          autoComplete="false"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
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
        <button
          type="button"
          className="bg-lightBlue hover:bg-darkBlue text-darkGray hover:text-lightGray font-bold py-2 px-4 rounded-2xl m-6"
          disabled={hidden}
          onClick={(e) => handleSubmit(e)}
        >
          Enviar
        </button>
        <p className="bottom-text text-center">
          <small>
            By clicking the Sign Up button, you agree to our{" "}
            <Link className="text-lightBlue">Terms & Conditions</Link> and{" "}
            <Link className="text-lightBlue">Privacy Policy</Link>.
          </small>
        </p>
      </form>
      <div className="d-flex flex-column gap-3">
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-lightBlue text-lg">
            Login
          </Link>
        </p>
      </div>
    </div>
    <AnimationHome />
      </div>)}
    
    </>
  );
};

export default Register;
