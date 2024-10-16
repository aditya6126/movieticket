import React from 'react'
import { movies } from "../../data";
import { useNavigate } from 'react-router-dom';

const Comedy = () => {
  // used for navigating data to another route.
  const navigate = useNavigate();

  // filtering out the movies related to comedy.
  const Comedy = movies.filter(
    (m) => m.genres.includes("Comedy") && m.genres.includes("Drama")
  );

  // navigating to the movieBoking page
  const moveToBookingPage = (id) => {
    navigate("/movie-booking-details", { state: { movie_id: id } });
  };
  return (
    <>
      <p className="text-2xl max-sm:text-lg font-sans font-bold pl-4 max-sm:pl-2 pb-2 mt-6 max-sm:mt-2">Action & Comedy</p>
      <div className="flex flex-wrap gap-2 font-sans justify-evenly items-center">
        {Comedy.map((movies, index) => {
          return (
            <div
              key={index}
              className="w-[260px] my-2 bg-slate-200 max-sm:w-[140px] cursor-pointer rounded-lg shadow-lg mx-2 max-sm:mx-1"
            >
              <img
                className="w-full h-[360px] max-sm:h-[180px] rounded-tl-lg rounded-tr-lg hover:scale-105 hover:opacity-90 ease-in-out duration-300"
                src={movies.poster}
                alt="Poster of the movie"
              />
              <div className="p-2">
                <h1 className="font-bold text-xl py-2 max-sm:py-1 max-sm:text-sm overflow-hidden">
                  {movies.title}
                </h1>
                <p className="text-base max-sm:text-sm w-full truncate">
                  {movies.plot}
                </p>
                <div className="flex max-sm:flex-col justify-between items-center mt-3 max-sm:mt-1">
                  <p className="text-green-600 font-medium text-base max-sm:text-sm">
                    <span className="text-yellow-800">IMDb: </span>{movies.imdb["rating"]["$numberDouble"]}
                  </p>
                  <button onClick={() => moveToBookingPage(movies['_id']['$oid'])} className="bg-blue-500 max-sm:mt-1 text-white font-bold px-3 py-2 max-sm:text-xs max-sm:px-2 max-sm:py-1 max-sm:text-normal text-sm text-medium rounded-lg hover:bg-blue-600">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}

// exporting the component.
export default Comedy