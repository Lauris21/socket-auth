import Swal from "sweetalert2/dist/sweetalert2.all.js";

const useVerifyCodeError = (res, setDeleteUser, setOkCheck, setUser) => {
  if (res?.response?.status == 500) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Interval Server Error ❌!",
      showConfirmButton: false,
      timer: 1200,
    });
  }

  if (res?.data?.delete?.includes("Ok delete user")) {
    setDeleteUser(() => true);
    Swal.fire({
      icon: "error",
      title: "Code is no corret",
      text: "Your user is delete. Register again, please ❌!",
      showConfirmButton: false,
      timer: 1200,
    });
  }

  if (res?.data?.delete?.includes("Error delete user")) {
    setDeleteUser(() => true);
    Swal.fire({
      icon: "error",
      title: "Code is no corret",
      text: "No delete user. Try again, please ❌!",
      showConfirmButton: false,
      timer: 1200,
    });
  }

  if (res?.data?.testCheckOk?.toString() == "true") {
    if (localStorage.getItem("user")) {
      const currentUser = localStorage.getItem("user");
      const parseCurrentUser = JSON.parse(currentUser);
      const customUser = {
        ...parseCurrentUser,
        check: true,
      };
      const customUserString = JSON.stringify(customUser);
      setUser(() => customUser);
      localStorage.setItem("user", customUserString);
    }

    setOkCheck(() => true);
    Swal.fire({
      icon: "success",
      title: "Ok correct code ✅",
      showConfirmButton: false,
      timer: 1200,
    });
  }

  if (res?.data?.testCheckOk?.toString() == "false") {
    Swal.fire({
      icon: "error",
      title: "Internal Server Error",
      text: "No delete user. Try again, please ❌",
      showConfirmButton: false,
      timer: 1200,
    });
  }

  if (res?.response?.status == 404) {
    Swal.fire({
      icon: "error",
      title: "Interval Server Error!",
      text: "No delete User. Try again, please",
      showConfirmButton: false,
      timer: 1200,
    });
  }
};

export default useVerifyCodeError;
