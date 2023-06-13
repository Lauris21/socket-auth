import Swal from "sweetalert2/dist/sweetalert2.all.js";

const useUpdateTokenError = (res, setResOk) => {
  if (res?.status == 500)
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Interval Server Error ❌!",
      showConfirmButton: false,
      timer: 1200,
    });

  if (res?.status == 200) {
    setResOk(() => true);
  }
};

export default useUpdateTokenError;
