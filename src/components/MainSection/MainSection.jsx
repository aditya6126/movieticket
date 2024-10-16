import React from "react";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";
import MyBookings from "./MyBookings";
import Drama from "./Drama";
import Romance from "./Romance";
import Comedy from "./Comedy";
import Biography from "./Biography";
import MovieAndBookingDetails from "./MovieAndBookingDetails";
import TeamPage from "../sideNavBar/teamMembers";

const MainSection = () => {
  return (
    <div className="flex-1 h-screen overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/drama" element={<Drama />} />
        <Route path="/romance" element={<Romance />} />
        <Route path="/action-comedy" element={<Comedy />} />
        <Route path="/biography" element={<Biography />} />
        <Route path="/Team" element={<TeamPage />} />
        <Route
          path="/movie-booking-details"
          element={<MovieAndBookingDetails />}
        />
      </Routes>
    </div>
  );
};

export default MainSection;
