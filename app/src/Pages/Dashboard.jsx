import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";

// import socketIo from "socket.io-client";
// const socket = socketIo.connect("http://localhost:8080");

const Dashboard = () => {
  const { logout, user } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="w-50 h-100 d-flex flex-column align-items-center gap-5">
      <h1 className="mb-5">Dashboard</h1>
      <div className="d-flex flex-column align-items-center gap-5">
        <h3> Hello 👋🏽 ! Here YOUR Profile</h3>
        {user !== null && (
          <>
            <figure className="d-flex align-items-center gap-5">
              <h5>{user.name}</h5>
              <img
                src={user.image}
                alt={`user image by ${user.name}`}
                className="rounded image_profile"
              />
            </figure>
            <p>{user.email}</p>
          </>
        )}
      </div>
      <button className="btn btn-primary" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
