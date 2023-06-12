import Swal from "sweetalert2/dist/sweetalert2.all.js";

const useLoginError = (res, setLoginOk, userLogin) => {
  if (res?.status == 500)
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Interval Server Error ❌!",
      showConfirmButton: false,
      timer: 1200,
    });

  if (res?.status == 200) {
    const dataCustom = {
      token: res.data.token,
      user: res.data.user.name,
      email: res.data.user.email,
      image: res.data.user.image,
      check: res.data.user.check,
    };
    const dataString = JSON.stringify(dataCustom);
    userLogin(dataString);
    setLoginOk(() => true);
    Swal.fire({
      icon: "success",
      title: "Wellcome to Chat-App",
      showConfirmButton: false,
      timer: 1200,
    });
  }

  if (res?.response?.data?.includes("Password dont match"))
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password dont match ❌",
      showConfirmButton: false,
      timer: 1200,
    });

  if (res?.response?.data?.includes("User no register"))
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Unregistered user ❌",
      showConfirmButton: false,
      timer: 1200,
    });
};

export default useLoginError;
