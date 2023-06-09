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
    <div className="w-screen h-screen flex flex-col items-center justify-between">
      <div className="p-24 flex flex-col gap-5 items-center">
        {user != null ? (
          <Navigate to="/dashboard" />
        ) : mensajeLogin ? (
          <div className="fix">
            <h2>Debe Loguearse</h2>
          </div>
        ) : (
          <>
            <h1 className="text-6xl font-semibold">Chat App</h1>
            <br />
            <br />
            <GoogleLogin onSuccess={responseMsg} onError={errorMsg} />
            <br />
            <br />
            <div className="w-full flex justify-between">
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-gray-300 font-bold py-2 px-4 rounded-2xl"
                onClick={() => navigate("/register")}
              >
                REGISTER
              </button>
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-gray-300 font-bold py-2 px-4 rounded-2xl"
                onClick={() => navigate("/login")}
              >
                LOGIN
              </button>
            </div>
          </>
        )}
      </div>
      <div className="w-screen">
        <svg width="100%" height="200px" fill="none">
          <path
            fill="#454599"
            d="
          M0 67
          C 273,183
            822,-40
            1920.00,106 

          V 359 
          H 0 
          V 67
          Z"
          >
            <animate
              repeatCount="indefinite"
              fill="#454599"
              attributeName="d"
              dur="15s"
              values="
            M0 77 
            C 473,283
              822,-40
              1920,116 

            V 359 
            H 0 
            V 67 
            Z; 

            M0 77 
            C 473,-40
              1222,283
              1920,136 

            V 359 
            H 0 
            V 67 
            Z; 

            M0 77 
            C 973,260
              1722,-53
              1920,120 

            V 359 
            H 0 
            V 67 
            Z; 

            M0 77 
            C 473,283
              822,-40
              1920,116 

            V 359 
            H 0 
            V 67 
            Z
            "
            ></animate>
          </path>
        </svg>
      </div>
    </div>
  );
};

export default Home;
