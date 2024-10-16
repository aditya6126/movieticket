import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import DeleteAlert from "./DeleteAlert";
import UpdateAlert from "./UpdateAlert";
import LoaderComponent from "./LoaderComponent";

const MyBookings = () => {
  const [bookingObj, setBookingObj] = useState([]);
  const [deleteVisibility, setDeleteVisibility] = useState(false);
  const [updateVisibility, setUpdateVisibility] = useState(false);
  const [loaderVisibility, setLoaderVisibility] = useState(true);
  const [movieId, setMovieId] = useState(null);

  const getMovieBookings = async () => {
    // getting the bookings from the mongodb database through the server.
    // For deployment in MERN Stack Remove the localhost url.
    const res = await axios.get("http://localhost:8080/api/booking");
    setBookingObj(res.data);
    setLoaderVisibility(false);
  };

  // useEffect Hook for rendering the function.
  useEffect(() => {
    getMovieBookings();
  }, []);

  // handeling the delete booking functionality.
  const handleDelete = (id) => {
    setDeleteVisibility((prev) => !prev);
    setMovieId(id);
  };

  // handeling the update booking functionality.
  const handleUpdate = (id) => {
    setUpdateVisibility((prev) => !prev);
    setMovieId(id);
  };

  return (
    <div
      className={`p-4 bg-gray-100 max-sm:p-2 max-sm:overflow-scroll ${bookingObj.length > 4 ? "h-fit" : "h-screen"
        }`}
    >
      <p className="font-semibold text-2xl max-sm:text-lg pl-4 max-sm:pl-1">
        My Recent Bookings
      </p>
      <div className="ml-4 max-sm:ml-0">
        {bookingObj.map((booking, i) => {
          return (
            <div
              key={i}
              className={`relative w-[380px] bg-white max-sm:px-2 max-sm:py-2 px-6 py-4 rounded-xl shadow hover:ring-2 ring-dark-purple my-4 max-sm:w-[280px] hover:scale-105 max-sm:hover:scale-100 duration-500`}
            >
              <div className="absolute top-2 right-2 max-sm:top-1 max-sm:right-1">
                <div
                  onClick={() => handleDelete(booking._id)}
                  className="group p-2 max-sm:p-1 rounded-full hover:bg-gray-200 cursor-pointer duration-150 inline-block"
                >
                  <MdDelete />
                  <span className="max-sm:text-xs ml-2 max-sm:ml-0 max-sm:mt-2 invisible group-hover:visible opacity-0 text-base font-medium group-hover:opacity-100 absolute duration-100 px-3 py-1 rounded-lg bg-red-500 text-white mt-3">
                    Delete
                  </span>
                </div>
                <div
                  onClick={() => handleUpdate(booking._id)}
                  className="group relative max-sm:p-1 p-2 rounded-full hover:bg-gray-200 cursor-pointer duration-150 inline-block"
                >
                  <FaPencilAlt />
                  <span className="max-sm:text-xs max-sm:ml-0 max-sm:mt-2 ml-2 invisible group-hover:visible opacity-0 text-base font-medium group-hover:opacity-100 absolute duration-100 px-3 py-1 rounded-lg bg-yellow-200 mt-3">
                    Update
                  </span>
                </div>
              </div>

              <p className="text-dark-purple font-medium text-lg max-sm:text-sm whitespace-pre-wrap">
                Title: {booking.title}
              </p>
              <p className="text-dark-purple font-medium text-lg max-sm:text-xs mt-1">
                Time Slot: {booking.time_slot}
              </p>
              <div className="flex flex-wrap mt-1">
                {Object.keys(booking.seats).map((seat, index) => {
                  return (
                    <div
                      key={index}
                      className="mt-1 py-2 px-4 max-sm:px-2 max-sm:py-1 mr-2 border-2 border-blue-900 rounded-lg flex flex-col items-center justify-center gap-y-1 max-sm:gap-y-0"
                    >
                      <p className="font-semibold max-sm:text-xs">{seat}</p>
                      <p className="text-dark-purple max-sm:text-sm text-xl font-semibold">
                        {booking.seats[seat]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {/* Loader Component */}
      {loaderVisibility && <LoaderComponent loaderVisibility={loaderVisibility} />}
      {/* Setting the Delete Alert */}
      <DeleteAlert
        message={"Do you want to delete this Booking?"}
        visibility={deleteVisibility}
        setVisibility={setDeleteVisibility}
        movieId={movieId}
        setBookingObj={setBookingObj}
        bookingObj={bookingObj}
      />
      {/* Setting the Update Alert */}
      <UpdateAlert
        visibility={updateVisibility}
        setVisibility={setUpdateVisibility}
        movieId={movieId}
        getMovieBookings={getMovieBookings}
      />
    </div>
  );
};

export default MyBookings;
