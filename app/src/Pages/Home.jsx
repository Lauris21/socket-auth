import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>Home</div> <h1>Wellcome</h1>
      <button onClick={() => navigate("/login")}>Login</button>
    </>
  );
};

export default Home;
