import Swal from "sweetalert2";

const useRegisterError = (res, setRegisterOk) => {
  if (res?.status == 200) {
    console.log("entro");
    localStorage.setItem("data", JSON.stringify(res));
    setRegisterOk(() => true);
    console.log("entro33", Swal);
    Swal.fire({
      icon: "success",
      title: "Welcome 👽",
      showConfirmButton: false,
      timer: 1200,
    });
  }

  if (res?.response?.status == 409) {
    Swal.fire({
      icon: "error",
      title: "Oops.!",
      text: "User already exist! ❎",
      showConfirmButton: false,
      timer: 1200,
    });
  }

  if (res?.response?.status == 500) {
    Swal.fire({
      icon: "error",
      title: "Oops.!",
      text: "Sorry! Internal Server Error ❎",
      showConfirmButton: false,
      timer: 1200,
    });
  }

  if (
    res?.response?.data?.includes(
      "duplicate key error collection: userProyect.users index: name_1 dup key: { name"
    )
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops.!",
      text: "Sorry! Choose other name ❎",
      showConfirmButton: false,
      timer: 1200,
    });
  }

  if (res?.response?.data?.includes("validation failed: password")) {
    Swal.fire({
      icon: "error",
      title: "Oops.!",
      text: "Min 8 characters, 1 upper case, 1 lower case and a special character ❎",
      showConfirmButton: false,
      timer: 1200,
    });
  }
};

export default useRegisterError;
