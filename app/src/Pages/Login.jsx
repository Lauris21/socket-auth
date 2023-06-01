import { GoogleLogin } from "@react-oauth/google";
import { googleSignIn } from "../services/API_Chat/user.service";
//import { useState } from "react";

const Login = () => {
  // const [res, setRes] = useState({});

  const responseMsg = async (codeResponse) => {
    const token = { token: codeResponse.credential };
    await googleSignIn(JSON.stringify(token));
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
