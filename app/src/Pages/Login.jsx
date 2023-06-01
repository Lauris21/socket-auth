import { GoogleLogin } from "@react-oauth/google";
import { googleSignIn } from "../services/API_Chat/user.service";
import { useState } from "react";
import { useEffect } from "react";

const Login = () => {
  const [res, setRes] = useState({});

  const responseMsg = async (codeResponse) => {
    const token_id = { token_id: codeResponse.credential };
    setRes(await googleSignIn(JSON.stringify(token_id)));
  };

  const errorMsg = (error) => {
    console.log(error);
  };

  return (
    <div>
      <h1>Login</h1>
      <br />
      <br />
      <GoogleLogin onSuccess={responseMsg} onError={errorMsg} />
    </div>
  );
};

export default Login;
