import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const UpdateAlert = ({
  visibility,
  setVisibility,
  movieId,
  getMovieBookings,
}) => {
  const [timeSlots, setTimeSlot] = useState([
    { time: "113:00 AM", selected: false },
    { time: "10:00 PM", selected: false },
    { time: "440:00 PM", selected: false },
    { time: "800  :00 PM", selected: false },
  ]);

  const [seatType, setSeatType] = useState([
    { type: "AC", value: 0, selected: false },
    { type: "NON AC", value: 0, selected: false },
    { type: "FRONT ROW", value: 0, selected: false },
    { type: "back row", value: 0, selected: false },
  ]);

  // maintaing the visibility of alert message.
  if (!visibility) {
    return null;
  }

  // incrementing the number of seats
  const increment = (index) => {
    // use spread operator
    const newarr = [...seatType];
    newarr[index]["value"] += 1;
    setSeatType(newarr);
  };

  // decrementing the number of seats
  const decrement = (index) => {
    // use spread operator
    const newarr = [...seatType];
    newarr[index]["value"] -= 1;
    setSeatType(newarr);
  };

  // handeling different time slots of movies.
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

  // handeling different seat types.
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

  // canceling the visibility of alert box.
  const handleCancel = () => {
    setVisibility((prev) => !prev);
  };

  const handleYes = async () => {
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
      seats: {
        A: parseInt(seatType[0]["value"]) >= 0 ? seatType[0]["value"] : 0,
        B: parseInt(seatType[1]["value"]) >= 0 ? seatType[1]["value"] : 0,
        C: parseInt(seatType[2]["value"]) >= 0 ? seatType[2]["value"] : 0,
        D: parseInt(seatType[3]["value"]) >= 0 ? seatType[3]["value"] : 0,
      },
      time_slot: selectedTime,
    };

    // Patch the Movie Details throug axios library.
    // For deployment in MERN Stack Remove the localhost url.
    const res = await axios.patch(
      `http://localhost:8080/api/booking/${movieId}`,
      selectedMovie
    );
    if (res.status === 200) {
      toast.success("Successfully Updated");
      getMovieBookings();
    } else {
      toast.error("Error While Updating");
    }
    handleCancel();

    setTimeSlot([
      { time: "10:00 AM", selected: false },
      { time: "1:00 PM", selected: false },
      { time: "4:00 PM", selected: false },
      { time: "8:00 PM", selected: false },
    ]);

    setSeatType([
      { type: "AC", value: 0, selected: false },
      { type: "NON ac", value: 0, selected: false },
      { type: "Type C", value: 0, selected: false },
      { type: "Type D", value: 0, selected: false },
    ]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-gray-100 p-4 max-sm:p-2 rounded-lg">
        <p className="font-medium text-lg max-sm:text-base">
          Update Your Booking Details
        </p>
        <div className="bg-white max-sm:text-sm p-4 rounded-lg shadow cursor-pointer mt-5 max-sm:mt-2 max-sm:mr-2">
          <h2 className="text-lg max-sm:text-base font-semibold mb-4 max-sm:mb-2">
            Select a Time Slot
          </h2>
          <div className="flex max-sm:flex-wrap justify-start">
            {timeSlots.map((slot, i) => {
              return (
                <p
                  key={i}
                  onClick={() => handleTimeSlot(i)}
                  className={`p-2 text-lg max-sm:text-sm max-sm:mb-2 font-semibold border-2 border-gray-500 rounded-lg hover:bg-blue-800 hover:text-white duration-150 mr-2 ${slot.selected && "bg-blue-900 text-white"
                    }`}
                >
                  {slot.time}
                </p>
              );
            })}
          </div>
        </div>

        <div className="bg-white max-sm:text-sm p-4 max-sm:p-2 rounded-lg shadow cursor-pointer mt-5 max-sm:mt-2 max-sm:mr-2">
          <h2 className="text-lg max-sm:text-base font-semibold mb-4">
            Select the seats
          </h2>
          <div className="flex max-sm:flex-wrap justify-start">
            {seatType.map((seats, i) => {
              return (
                <div
                  onClick={() => handelSeatType(i)}
                  key={i}
                  className={`px-4 w-32 max-sm:w-28 max-sm:mb-1 py-2 mx-2 border-2 border-gray-400 rounded-lg flex flex-col items-center justify-center gap-y-1 hover:bg-blue-800 hover:text-white ${seats.selected && "bg-blue-900 text-white"
                    }`}
                >
                  <p className="font-semibold text-lg max-sm:text-sm">
                    {seats.type}
                  </p>
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
        <div className="flex gap-2 text-base max-sm:text-xs mt-4">
          <button
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-400 text-white font-medium px-3 py-1 max-sm:px-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleYes}
            className="bg-blue-500 hover:bg-blue-400 text-white font-medium px-3 py-1 max-sm:px-2 rounded-lg"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

// exporting the component.
export default UpdateAlert;
