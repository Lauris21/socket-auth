import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="w-50 d-flex flex-column align-items-center gap-5">
      <h1>Register</h1>

      <div className="d-flex flex-column gap-3">
        <input type="text" id="name" placeholder="name" />
        <input type="email" id="email" placeholder="email" />
        <input type="password" id="password" placeholder="password" />
      </div>
      <div className="d-flex flex-column gap-3">
        <button className="btn btn-primary">Enviar</button>
        <p>
          Or <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
