import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideNavigationBar = () => {
  // state for opening and closing the navigation bar.
  const [open, setOpen] = useState(true);

  // used for navigating data to another route.
  const navigate = useNavigate();

  // categories
 // categories
const Categories = [
  { title: "Dashboard", src: "Chart_fill" },
  { title: "My Bookings", src: "booking" }, 
  { title: "Team", src: "team.png" },// New category added for the Team page
];


  // different movie categories
  const MovieCategories = [
    { title: "Drama", src: "drama", gap: true },
    { title: "Romance", src: "romance" },
    { title: "Action & Comedy", src: "war" },
    { title: "Biography", src: "biography" },
  ];

  // function for handeling the routes
 // function for handling the routes
const handleClick = (title) => {
  if (title === "Dashboard") {
    navigate("/");
  } else if (title === "My Bookings") {
    navigate("/mybookings");
  } else if (title === "Team") {
    navigate("/team"); // New route for the Team page
  } else if (title === "Drama") {
    navigate("/drama");
  } else if (title === "Romance") {
    navigate("/romance");
  } else if (title === "Action & Comedy") {
    navigate("/action-comedy");
  } else if (title === "Biography") {
    navigate("/biography");
  }
};

  return (
    <div
      className={`relative ${
        open ? "w-72 max-sm:w-64" : "w-20 max-sm:w-14"
      } duration-300 h-screen bg-dark-purple p-5 max-sm:p-2 max-sm:pt-4`}
    >
      <img
        src="./assets/control.png"
        alt="logo"
        onClick={() => setOpen((prev) => !prev)}
        className={`absolute cursor-pointer rounded-full -right-3 top-8 w-7 max-sm:w-5 max-sm:top-7 border-2 border-dark-purple ${
          !open && "rotate-180"
        }`}
      />
      <div className="flex gap-x-4 items-end">
        <img
          src="./assets/logo.png"
          alt="logo"
          className={`h-10 max-sm:h-8 cursor-pointer duration-500 ${
            open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`text-white origin-left font-bold text-xl max-sm:text-lg duration-300 ${
            !open && "scale-0"
          }`}
        >
          book<span className="text-red-400">MY</span>movie
        </h1>
      </div>

      <ul className="pt-6">
        {Categories.map((menu, index) => {
          return (
            <li
              key={index}
              className={`text-gray-300 text-sm font-medium flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${
                menu.gap ? "mt-9" : "mt-2"
              }`}
              onClick={() => handleClick(menu.title)}
            >
              <img
                src={`./assets/${menu.src}.png`}
                alt="logo"
                className="w-8"
              />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {menu.title}
              </span>
            </li>
          );
        })}
      </ul>
      <h1
        className={`font-bold text-white duration-300 ${!open && "scale-0"} ${
          !open ? "mt-0" : "mt-8"
        }`}
      >
        Categories
      </h1>
      <ul className={`${open && "pt-2"}`}>
        {MovieCategories.map((menu, index) => {
          return (
            <li
              key={index}
              className={`text-gray-300 text-sm font-medium flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2`}
              onClick={() => handleClick(menu.title)}
            >
              <img
                src={`./assets/${menu.src}.png`}
                alt="logo"
                className="w-8"
              />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {menu.title}
              </span>
            </li>
          );
        })}
      </ul>
      
    </div>
  );
};

// exporting the navigation bar
export default SideNavigationBar;
