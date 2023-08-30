import Swal from "sweetalert2/dist/sweetalert2.all.js";

const useCreateChatError = (
  res,
  setRes,
  setShow,
  newChat,
  setNewChat,
  setChatCreated
) => {
  if (res?.status == 200) {
    setNewChat(() => !newChat);
    setShow(() => false);
    setChatCreated(() => true);
    setRes(() => ({}));
    // setChatCreated(() => false);
    return Swal.fire({
      icon: "success",
      title: "Chat has been create 💬",
      showConfirmButton: false,
      timer: 1200,
    });
  }

  if (res?.response?.status == 409) {
    setShow(() => false);
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "This chat already exists 💬",
      showConfirmButton: false,
      timer: 1200,
    });
  }

  if (res?.response?.status == 404) {
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Chat hasn`t been create 💬",
      showConfirmButton: false,
      timer: 1200,
    });
  }
};

export default useCreateChatError;
