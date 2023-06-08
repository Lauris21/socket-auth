import { GoogleLogin } from "@react-oauth/google";
import { googleSignIn } from "../services/API_Chat/user.service";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/userContext";

const Home = () => {
  const navigate = useNavigate();

  const [mensajeLogin, setMensajeLogin] = useState(false);
  const [res, setRes] = useState(null);

  const { login, user } = useAuth();

  const responseMsg = async (codeResponse) => {
    const token_id = { token_id: codeResponse.credential };
    setRes(await googleSignIn(JSON.stringify(token_id)));
  };

  const errorMsg = (error) => {
    console.log(error);
  };

  useEffect(() => {
    if (res !== null) {
      if (res.data.msg.includes("login")) {
        login(res.data);
      } else {
        setMensajeLogin(true);
        const time = setTimeout(() => {
          setMensajeLogin(false);
        }, 3000);
        return () => clearTimeout(time);
      }
    }
  }, [res]);

  return (
    <div className="w-50 h-50 d-flex flex-column align-items-center">
      {user != null ? (
        <Navigate to="/dashboard" />
      ) : mensajeLogin ? (
        <div className="fix">
          <h2>Debe Loguearse</h2>
        </div>
      ) : (
        <>
          <h2>Google Sign In</h2>
          <br />
          <br />
          <GoogleLogin onSuccess={responseMsg} onError={errorMsg} />
          <br />
          <br />
          <div className="d-flex justify-content-between w-75">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/register")}
            >
              REGISTER
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
