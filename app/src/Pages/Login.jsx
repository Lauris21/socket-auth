import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Wellcome</h1>
      <button className="btn btn-primary" onClick={() => navigate("/login")}>
        Login
      </button>
    </>
  );
};

export default Login;
