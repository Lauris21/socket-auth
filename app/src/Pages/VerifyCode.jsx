import { useEffect, useState } from "react";
import { useAuth } from "../context/userContext";
import { checkNewUser, resendCode } from "../services/API_Chat/user.service";
import useVerifyCodeError from "../hooks/useVerifyCodeError";
import useResendCodeError from "../hooks/useResendCodeError";
import { Navigate } from "react-router-dom";
import useAutoLogin from "../hooks/useAutoLogin";

const VerifyCode = () => {
  const { allUser, setUser, userLogin } = useAuth();
  const [code, setCode] = useState();
  const [res, setRes] = useState({});
  const [resResendCode, setResResendCode] = useState({});
  const [hidden, setHidden] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [okCheck, setOkCheck] = useState(false);

  const handleVerify = async (formData, e) => {
    e.preventDefault();
    const userLocal = localStorage.getItem("user");

    if (userLocal == null) {
      const data = {
        confirmationCode: parseInt(formData),
        email: allUser.user.email,
      };
      setHidden(true);
      setRes(await checkNewUser(data));
      setHidden(false);
    } else {
      const parseUSer = JSON.parse(userLocal);
      const data = {
        confirmationCode: parseInt(formData),
        email: parseUSer.email,
      };
      setHidden(true);
      setRes(await checkNewUser(data));
      setHidden(false);
    }
  };

  const handleResendCode = async (e) => {
    e.preventDefault();
    const userLocal = localStorage.getItem("user");

    if (userLocal == null) {
      const data = { email: allUser.user?.email };
      setHidden(true);
      setResResendCode(await resendCode(data));
      setHidden(false);
    } else {
      const parseUSer = JSON.parse(userLocal);
      const data = { email: parseUSer.email };
      setHidden(true);
      setResResendCode(await resendCode(data));
      setHidden(false);
    }
  };

  useEffect(() => {
    useVerifyCodeError(res, setDeleteUser, setOkCheck, setUser);
  }, [res]);

  useEffect(() => {
    useResendCodeError(res);
  }, [resResendCode]);

  if (deleteUser) {
    return <Navigate to="/register" />;
  }

  if (okCheck) {
    if (!localStorage.getItem("user")) {
      useAutoLogin(allUser, userLogin);
    } else {
      return <Navigate to="/dashboard" />;
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-8 justify-center items-center">
      <h2 className="text-4xl font-semibold drop-shadow-[11px_-3px_4px_rgba(0,180,219,0.28)] mb-6">
        Verify your CODE 👌🏽
      </h2>
      <p>Write the code sent to your email</p>
      <form className="shadow-md rounded px-8 pt-6 pb-8 flex flex-col gap-8 items-center">
        <label htmlFor="verify"></label>
        <input
          className="w-56 shadow appearance-none border rounded py-2 px-3 text-darkGray leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="verify"
          name="verify"
          autoComplete="false"
          onChange={(e) => setCode(e.target.value)}
        />
        <div className="flex flex-col gap-5">
          <button
            disabled={hidden}
            className="bg-lightBlue hover:bg-darkBlue text-darkGray hover:text-lightGray font-bold py-2 px-4 rounded-2xl"
            onClick={(e) => handleVerify(code, e)}
          >
            Verify Code
          </button>
          <button
            disabled={hidden}
            className="bg-lightBlue hover:bg-darkBlue text-darkGray hover:text-lightGray font-bold py-2 px-4 rounded-2xl"
            onClick={(e) => handleResendCode(e)}
          >
            Resend Code
          </button>
        </div>
        <p className="">
          <small>
            If the code is not correct ❌, your user will be deleted from the
            database and you will need to register again.{" "}
          </small>
        </p>
      </form>
    </div>
  );
};

export default VerifyCode;
