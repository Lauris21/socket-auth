import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const responseMsg = (response) => {
    console.log(response);
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
