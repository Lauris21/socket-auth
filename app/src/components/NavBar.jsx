import { useAuth } from "../context/userContext";
import { LogOut } from "./Logout";

const NavBar = () => {
  const { user, connect } = useAuth();
  return (
    <>
      <header className="p-5 flex flex-column justify-between bg-bgHeader">
        <img
          src="https://res.cloudinary.com/dh9z8mk2j/image/upload/v1686589073/logo_wthqig.png"
          alt="logo Chat App"
          className="w-12 h-12 self-center"
        />

        <figure className="flex gap-16 items-center p-2">
          <img
            src={user.image}
            alt={`user image by ${user.name}`}
            className="rounded w-10 h-10"
          />
        </figure>
        <div className="h-[56px] flex" id="boxLogout">
          {connect ? (
            <h6 className="place-self-center">🟢 CONNECTED</h6>
          ) : (
            <LogOut />
          )}
        </div>
      </header>
    </>
  );
};

export default NavBar;
