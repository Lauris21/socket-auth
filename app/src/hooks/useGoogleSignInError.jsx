import Swal from "sweetalert2/dist/sweetalert2.all.js";

const useGoogleSignInError = (res, setIsLogin) => {
  if (res?.status == 200) {
    if (res?.data?.msg.includes("create okey")) {
      Swal.fire({
        icon: "success",
        title: "Welcome you should login",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (res?.data?.msg.includes("login okey")) {
      setIsLogin(() => true);

      Swal.fire({
        icon: "success",
        title: "Welcome 👽",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  if (res?.status == 500) {
    Swal.fire({
      icon: "error",
      title: "Oops.!",
      text: "Sorry! Internal Server Error ❌",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  if (res?.status == 401) {
    Swal.fire({
      icon: "error",
      title: "Oops.!",
      text: `${res.response.data.msg}`,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  if (res?.status == 404) {
    if (res?.data?.msg.includes("register")) {
      Swal.fire({
        icon: "error",
        title: "Error register user",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (res?.data?.msg.includes("login")) {
      Swal.fire({
        icon: "error",
        title: "Error login user",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
};

export default useGoogleSignInError;
