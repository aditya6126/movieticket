import React from "react";
import { movies } from "../../data";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // used for navigating data to other routes.
  const navigate = useNavigate();
  // filtering out the movies related to Drama and comedy
  const Drama = movies.filter(
    (m) => m.genres.includes("Drama") && m.genres.includes("Comedy")
  );
  // filtering out the movies related to Romance and drama.
  const Romance = movies.filter(
    (m) => m.genres.includes("Romance") && m.genres.includes("Drama")
  );
  // filtering out the movies related to Comedy and Action.
  const Comedy = movies.filter(
    (m) => m.genres.includes("Comedy") && m.genres.includes("Drama")
  );

  // filtering out the movies related to biography.
  const Biography = movies.filter((m) => m.genres.includes("Biography"));

  // All movie Categories.
  const MovieTitle = [
    { id: "drama", title: "Drama and Comedy", content: Drama, marginTop: true },
    { id: "romance", title: "Romance", content: Romance, marginTop: true },
    {
      id: "comedy",
      title: "Comedy and Action",
      content: Comedy,
      marginTop: true,
    },
    {
      id: "biography",
      title: "Biography",
      content: Biography,
      marginTop: true,
    },
  ];

  // maintaing the scrollbar in Left direction.
  const slideLeft = (id) => {
    let slider = document.getElementById(id);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  // maintaing the scrollbar in Right direction.
  const slideRight = (id) => {
    let slider = document.getElementById(id);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  // navigating to the movieBoking page
  const moveToBookingPage = (id) => {
    navigate("/movie-booking-details", { state: { movie_id: id } });
  };

  return (
    <div>
      {MovieTitle.map((category) => {
        return (
          <div className={`${category.marginTop && "mt-6"} max-sm:mt-2`}>
            <h1 className="font-bold text-2xl max-sm:text-base font-sans pl-4 pb-2">
              {category.title}
            </h1>
            <div className="relative flex items-center">
              <MdChevronLeft
                className="opacity-60 cursor-pointer hover:opacity-100 hover:bg-slate-300 hover:p-1 hover:rounded-full duration-200 ease-in-out"
                onClick={() => slideLeft(category.id)}
                size={40}
              />
              <div
                id={category.id}
                className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
              >
                {category.content.map((movies, index) => {
                  return (
                    <div
                      key={index}
                      className="w-[200px] bg-slate-200 max-sm:w-[130px] inline-block cursor-pointer rounded-lg shadow-lg mx-2 max-sm:mx-1"
                    >
                      <img
                        className="w-full h-72 max-sm:h-[170px] rounded-tl-lg rounded-tr-lg hover:scale-105 hover:opacity-90 ease-in-out duration-300"
                        src={movies.poster}
                        alt="Poster of the movie"
                      />
                      <div className="p-2">
                        <h1 className="font-bold text-lg py-2 max-sm:py-1 max-sm:text-xs overflow-hidden">
                          {movies.title}
                        </h1>
                        <div className="flex max-sm:flex-col justify-between items-center">
                          <p className="text-green-600 font-medium text-base max-sm:text-sm">
                            <span className="text-yellow-800">IMDb: </span>
                            {movies.imdb["rating"]["$numberDouble"]}
                          </p>
                          <button
                            onClick={() =>
                              moveToBookingPage(movies._id["$oid"])
                            }
                            className="bg-blue-500 font-bold max-sm:mt-1 text-white px-3 py-2 max-sm:text-xs max-sm:px-2 max-sm:py-1 max-sm:text-normal text-sm text-medium rounded-lg hover:bg-blue-600"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <MdChevronRight
                className="opacity-60 cursor-pointer hover:opacity-100 hover:bg-slate-300 hover:p-1 hover:rounded-full duration-200 ease-in-out"
                onClick={() => slideRight(category.id)}
                size={40}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// exporting the component.
export default Dashboard;
