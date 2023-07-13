import { GoogleLogin } from "@react-oauth/google";
import { googleSignIn } from "../services/API_Chat/user.service";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/userContext";
import AnimationHome from "../components/UI/AnimationHome";
import useGoogleSignInError from "../hooks/useGoogleSignInError";

const Home = () => {
  const navigate = useNavigate();

  const [res, setRes] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const { login } = useAuth();

  const responseMsg = async (codeResponse) => {
    const token_id = { token_id: codeResponse.credential };
    
    setRes(await googleSignIn(JSON.stringify(token_id)));
  };

  const errorMsg = (error) => {
    console.log(error);
  };

  useEffect(() => {
    useGoogleSignInError(res, setIsLogin);
  }, [res]);

  if (isLogin) {
    login(res.data);
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-between">
      <div className="p-24 flex flex-col gap-5 items-center md:mt-28">
        <h1 className="text-6xl font-semibold drop-shadow-[11px_-3px_4px_rgba(0,180,219,0.28)]">
          Chat App
        </h1>
        <br />
        <br />
        <GoogleLogin onSuccess={responseMsg} onError={errorMsg} />
        <br />
        <br />
        <div className="w-full flex justify-between">
          <button
            className="bg-lightBlue hover:bg-darkBlue text-darkGray hover:text-lightGray font-bold py-2 px-4 rounded-2xl"
            onClick={() => navigate("/register")}
          >
            REGISTER
          </button>
          <button
            className="bg-lightBlue hover:bg-darkBlue text-darkGray hover:text-lightGray font-bold py-2 px-4 rounded-2xl"
            onClick={() => navigate("/login")}
          >
            LOGIN
          </button>
        </div>
      </div>
      <AnimationHome />
    </div>
  );
};

export default Home;
