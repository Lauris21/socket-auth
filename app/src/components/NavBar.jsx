import { useAuth } from "../context/userContext";

const NavBar = () => {
  const { user, logout } = useAuth();
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
        <div className="h-[56px]" id="boxLogout">
          <button
            className="bg-lightBlue hover:bg-darkBlue text-darkGray hover:text-lightGray font-bold px-4 rounded-2xl h-full"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </header>
    </>
  );
};

export default NavBar;
