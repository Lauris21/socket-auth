import { useAuth } from "../context/userContext";

export const LogOut = () => {
  const { logout } = useAuth();
  return (
    <button
      className="bg-lightBlue hover:bg-darkBlue text-darkGray hover:text-lightGray font-bold px-4 rounded-2xl h-full"
      onClick={() => logout()}
    >
      Logout
    </button>
  );
};
