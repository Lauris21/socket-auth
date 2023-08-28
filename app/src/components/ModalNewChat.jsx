import { useState, useEffect } from "react";
import { getAllUsers } from "../services/API_Chat/user.service";
import { useAuth } from "../context/userContext";
import { createChat } from "../services/API_Chat/chat.services";
import useCreateChatError from "../hooks/useCreateChatError";

const ModalNewChat = () => {
  const { user, newChat, setNewChat } = useAuth();
  const [show, setShow] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [userTwo, setUserTwo] = useState("");
  const [hidden, setHidden] = useState(false);
  const [res, setRes] = useState({});

  useEffect(() => {
    const getAll = async () => {
      const all = await getAllUsers();
      setAllUsers(all.data);
    };
    getAll();
    console.log("all", allUsers);

    return () => {
      setUserTwo("");
    };
  }, [show]);

  useEffect(() => {
    useCreateChatError(res, setShow);
  }, [res]);

  const handleChange = (e) => {
    const user = e.target.value.slice(2);
    const userFilter = allUsers.filter((item) => item.email == user);
    setUserTwo(userFilter[0]);
  };

  const handleClick = async () => {
    const data = {
      userTwo: userTwo._id,
    };
    console.log(data);
    setHidden(true);
    setRes(await createChat(data));
    setHidden(false);
    console.log(res);
  };

  return (
    <>
      <button
        className="bg-bgHeader hover:bg-midleBlue hover:text-lightGray focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
        onClick={() => setShow(() => !show)}
      >
        NEW CHAT
      </button>
      {show && (
        <div className="fixed top-0 left-0 right-0 z-5 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center">
          <div className="relative w-full max-w-2xl max-h-full border-2 rounded-lg bg-darkGray">
            <div className="relative rounded-lg shadow justify-center bg-darkGray">
              <div className="flex items-start p-4 border-b rounded-t ">
                <h3 className="text-xl font-semibold text-center">
                  NEW CHAT WITH...{userTwo && `${userTwo.name}`}
                </h3>
                <button
                  type="button"
                  className=" bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                  data-modal-hide="defaultModal"
                  onClick={() => setShow(() => false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-6 space-y-6">
                <select
                  className="text-darkGray p-1"
                  required
                  onChange={(e) => handleChange(e)}
                >
                  <option value="" hidden>
                    ALL USERS
                  </option>
                  {allUsers &&
                    allUsers
                      .filter((item) => item.email !== user.email)
                      .map((item, i) => (
                        <option key={item._id}>
                          {i % 2 == 0 ? `🐥 ` : `🐠 `}
                          {`${item.email}`}
                        </option>
                      ))}
                </select>
              </div>

              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={() => handleClick()}
                  type="button"
                  disabled={hidden}
                  className="bg-bgHeader hover:bg-midleBlue hover:text-lightGray focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  CREATE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalNewChat;
