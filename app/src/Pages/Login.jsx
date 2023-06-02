import { GoogleLogin } from "@react-oauth/google";
import { googleSignIn } from "../services/API_Chat/user.service";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../constext/userContext";

const Login = () => {
  const [mensajeLogin, setMensajeLogin] = useState(false);
  const [res, setRes] = useState(null);

  const { login } = useContext(UserContext);

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
        login(res.data.userDB);
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
    <div>
      {mensajeLogin ? (
        <div className="fix">
          <h2>Debe Loguearse</h2>
        </div>
      ) : (
        <>
          <h1>Google Sign In</h1>
          <br />
          <br />
          <GoogleLogin onSuccess={responseMsg} onError={errorMsg} />
          <br />
        </>
      )}
    </div>
  );
};

export default Login;
