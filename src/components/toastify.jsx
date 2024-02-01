import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Toastify({ info, setToast }) {
  info[1] === "success"
    ? toast.success(info[0], {
        onClose: () => setToast(null),
        toastId: info[2],
        autoClose: 2000,
      })
    : toast.error(info[0], { onClose: () => setToast(null), toastId: info[2] });

  return (
    <div>
      <ToastContainer theme="light" newestOnTop={true} pauseOnHover={false} />
    </div>
  );
}

export default Toastify;
