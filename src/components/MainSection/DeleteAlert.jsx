import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const DeleteAlert = ({
  message,
  visibility,
  setVisibility,
  movieId,
  setBookingObj,
  bookingObj,
}) => {
  // maintaing the visibility of alert message.
  if (!visibility) {
    return null;
  }

  // Handeling the success operation.
  const handleYes = async () => {
    // using axios for deleting the booking.
    // For deployment in MERN Stack Remove the localhost url.
    const res = await axios.delete(
      `http://localhost:8080/api/booking/${movieId}`
    );
    if (res.status === 200) {
      toast.success(res.data.msg);
    } else if (res.status === 204) {
      toast.warning(res.data.msg);
    } else {
      toast.error("Unable to delete the booking");
    }
    handleCancel();
    console.log(res);
    setBookingObj(bookingObj.filter((movie) => movie._id !== movieId));
  };

  // handeling the cancelation of delete.
  const handleCancel = () => {
    setVisibility((prev) => !prev);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-4 max-sm:p-2 rounded-lg">
        <p className="font-medium text-lg max-sm:text-base">{message}</p>
        <div className="flex gap-2 text-base max-sm:text-xs mt-4">
          <button
            onClick={handleCancel}
            className="bg-blue-500 hover:bg-blue-400 text-white font-medium px-3 py-1 max-sm:px-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleYes}
            className="bg-red-500 hover:bg-red-400 text-white font-medium px-3 py-1 max-sm:px-2 rounded-lg"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;
