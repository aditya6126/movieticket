import React, { useState } from "react";
import { movies } from "../../data";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const MovieAndBookingDetails = () => {
  // used for geting the data sent through navigater.
  const location = useLocation();
  // used for navigating data to another route.
  const navigate = useNavigate();
  let myMovie;

  // finding the desired movie.
  movies.map((movie) => {
    if (movie._id["$oid"] === location.state.movie_id) {
      myMovie = movie;
    }
    return 0;
  });

  // different time slots of booking.
  const [timeSlots, setTimeSlot] = useState([
    { time: "10:00 AM", selected: false },
    { time: "1:00 PM", selected: false },
    { time: "4:00 PM", selected: false },
    { time: "8:00 PM", selected: false },
  ]);

  // Different types of seats
  const [seatType, setSeatType] = useState([
    { type: "Type A", value: 0, selected: false },
    { type: "Type B", value: 0, selected: false },
    { type: "Type C", value: 0, selected: false },
    { type: "Type D", value: 0, selected: false },
  ]);

  // incrementing the number of seats.
  const increment = (index) => {
    // use spread operator
    const newarr = [...seatType];
    newarr[index]["value"] += 1;
    setSeatType(newarr);
  };

  // decrementing the number of seats.
  const decrement = (index) => {
    // use spread operator
    const newarr = [...seatType];
    newarr[index]["value"] -= 1;
    setSeatType(newarr);
  };

  // handling the time slot.
  const handleTimeSlot = (index) => {
    const newSlots = [...timeSlots];
    newSlots.map((slot, i) => {
      if (i === index) {
        slot.selected = true;
        return 0;
      } else {
        slot.selected = false;
        return 0;
      }
    });
    setTimeSlot(newSlots);
  };

  // handling seat type.
  const handelSeatType = (index) => {
    const newSeatType = [...seatType];
    newSeatType.map((seatType, i) => {
      if (i === index) {
        if (seatType.selected && seatType.value <= 0) {
          seatType.selected = false;
        } else {
          seatType.selected = true;
        }
      }
      return 0;
    });
    setSeatType(newSeatType);
  };

  const bookMovieSeat = async () => {
    let selectedTime = "";
    let count = 0;
    timeSlots.map((times) => {
      count++;
      if (times.selected === true) {
        selectedTime = times.time;
      }
      return 0;
    });
    if (count === timeSlots.length && selectedTime === "") {
      toast.warning("Please select the time slot!");
      return;
    }

    if (
      seatType[0]["value"] <= 0 &&
      seatType[1]["value"] <= 0 &&
      seatType[2]["value"] <= 0 &&
      seatType[3]["value"] <= 0
    ) {
      toast.warning("Please Book the number of seats of different types!");
      return;
    }

    const selectedMovie = {
      title: myMovie.title,
      seats: {
        A: parseInt(seatType[0]["value"]) >= 0 ? seatType[0]["value"] : 0,
        B: parseInt(seatType[1]["value"]) >= 0 ? seatType[1]["value"] : 0,
        C: parseInt(seatType[2]["value"]) >= 0 ? seatType[2]["value"] : 0,
        D: parseInt(seatType[3]["value"]) >= 0 ? seatType[3]["value"] : 0,
      },
      time_slot: selectedTime,
    };

    // posting the selectedmovie and its details to mongodb through the server.
    // For deployment in MERN Stack Remove the localhost url.
    await axios
      .post("http://localhost:8080/api/booking", selectedMovie)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success("Booked Successfully!");
          navigate("/");
        } else {
          toast.error("Error while Booking!");
          return;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-dark-purple max-sm:pr-2 border-l border-gray-600 p-4 text-white">
        <div className="container mx-auto">
          <h1 className="text-4xl max-sm:text-lg font-bold">{myMovie.title}</h1>
          <p className="text-lg max-sm:text-xs truncate">{myMovie.plot}</p>
        </div>
      </header>

      <div className="container mx-auto p-4 mt-2 max-sm:overflow-x-scroll scrollbar-hide">
        <div className="max-sm:pr-2 flex gap-x-10 max-sm:gap-x-0 max-sm:gap-y-1 max-sm:flex-col">
          <div className="w-1/3 max-sm:w-full">
            <img
              src={myMovie.poster}
              alt="Movie Poster"
              className="w-full rounded-lg shadow-lg hover:scale-105 ease-in-out duration-500 cursor-pointer"
            />
          </div>

          <div className="w-2/3 max-sm:w-fit max-sm:mt-4">
            <div className="bg-white p-4 text-lg max-sm:text-sm rounded-lg shadow-lg hover:scale-105 ease-in-out duration-500 cursor-pointer max-sm:mr-2">
              <h2 className="text-2xl max-sm:text-lg font-semibold mb-4">
                Movie Details
              </h2>
              <p className="mb-1">
                <span className="font-semibold">IMDb:</span>{" "}
                {myMovie["imdb"]["rating"]["$numberDouble"]}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Language:</span> English
              </p>
              <p className="mb-1">
                <span className="font-semibold">Genre:</span>{" "}
                {myMovie.genres.map((gener) => (
                  <p className="inline-block pr-1">{gener}</p>
                ))}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Release Year:</span>{" "}
                {myMovie["year"]["$numberInt"]}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Duration:</span> 2h 15min
              </p>
            </div>

            <div className="bg-white max-sm:text-sm p-4 rounded-lg shadow-lg hover:scale-105 ease-in-out duration-500 cursor-pointer mt-5 max-sm:mr-2">
              <h2 className="text-2xl max-sm:text-lg font-semibold mb-4">
                Select a Time Slot
              </h2>
              <div className="flex justify-start">
                {timeSlots.map((slot, i) => {
                  return (
                    <p
                      key={i}
                      onClick={() => handleTimeSlot(i)}
                      className={`p-2 text-lg max-sm:text-sm font-semibold border-2 border-gray-500 rounded-lg hover:bg-blue-800 hover:text-white duration-150 mr-2 ${slot.selected && "bg-blue-900 text-white"
                        }`}
                    >
                      {slot.time}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className="bg-white max-sm:text-sm p-4 rounded-lg shadow-lg hover:scale-105 ease-in-out duration-300 cursor-pointer mt-5 max-sm:mr-2">
              <h2 className="text-2xl max-sm:text-lg font-semibold mb-4">
                Select the seats
              </h2>
              <div className="flex justify-start">
                {seatType.map((seats, i) => {
                  return (
                    <div
                      onClick={() => handelSeatType(i)}
                      key={i}
                      className={`px-4 w-32 py-2 mx-2 border-2 border-gray-400 rounded-lg flex flex-col items-center justify-center gap-y-1 hover:bg-blue-800 hover:text-white ${seats.selected && "bg-blue-900 text-white"
                        }`}
                    >
                      <p className="font-semibold text-lg">{seats.type}</p>
                      <div className="w-full flex items-center justify-evenly border-gray-400 font-bold border-2 rounded">
                        <div
                          onClick={() => decrement(i)}
                          className="text-2xl hover:bg-gray-300 h-full w-1/3 flex items-center justify-center"
                        >
                          -
                        </div>
                        <div className="h-full hover:bg-gray-300 w-1/3 border-x-2 border-gray-400 flex items-center justify-center">
                          {seats.value}
                        </div>
                        <div
                          onClick={() => increment(i)}
                          className="text-2xl hover:bg-gray-300 h-full w-1/3 flex items-center justify-center"
                        >
                          +
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={bookMovieSeat}
              className="mt-4 font-bold text-xl text-white bg-blue-900  hover:bg-blue-800 hover:scale-105 ease-in-out duration-200 px-6 py-4 rounded-lg"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// exporting the components.
export default MovieAndBookingDetails;
