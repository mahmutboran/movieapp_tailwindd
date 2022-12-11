import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthContextProvider";
import { toastErrorNotify } from "../helpers/ToastNotify";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Main = () => {
  // if () {
  //   document.documentElement.classList.add("dark");
  // } else {
  //   document.documentElement.classList.remove("dark");
  // }

  const [movies, setMovies] = useState([]);
  const [seacrhTherm, setSeacrhTherm] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { currentUser } = useContext(AuthContext);
  const [imbd, setImbd] = useState();
  console.log(page);
  const AVERAGE = `
  https://api.themoviedb.org/3/discover/movie?api_key=3ae99fcb249d40519289af2feb3212b9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte=`;

  console.log(movies);
  const getMovies = (API) => {
    setLoading(true);
    axios
      .get(API)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getMovies(FEATURED_API + page);
  }, [page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (seacrhTherm && currentUser) {
      getMovies(SEARCH_API + seacrhTherm);
      setSeacrhTherm("");
    } else if (!currentUser) {
      toastErrorNotify("Please log in to see details");
    } else {
      toastErrorNotify("Please enter a text");
    }
  };
  const handleChange = (e) => {
    setImbd(e.target.value);
  };
  const handleFilter = (e) => {
    e.preventDefault();
    if (imbd && currentUser) {
      getMovies(AVERAGE + imbd);
      setImbd("");
    } else if (!currentUser) {
      toastErrorNotify("Please log in to see details");
    } else {
      toastErrorNotify("Please enter a text");
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    setPage(page + 1);
  };
  return (
    <div className=" flex-direction: column;">
      <div className="flex justify-center">
        <form className="flex justify-center p-2" onSubmit={handleSubmit}>
          <input
            type="search"
            className="w-80 h-8 rounded-md outline-none border p-1 m-2"
            placeholder="Search a movie..."
            value={seacrhTherm}
            onChange={(e) => setSeacrhTherm(e.target.value)}
          />

          <button className="dark:text-white" type="submit">
            Search
          </button>
        </form>
        <form className="flex justify-center p-2">
          <select
            name="imbd"
            onChange={handleChange}
            className="w-80 h-8 rounded-md outline-none border p-1 m-2"
          >
            <option>IMBD</option>
            <option value="9">Up 9</option>
            <option value="8">Up 8</option>
            <option value="7">Up 7</option>
            <option value="6">Up 6</option>
          </select>
          <button className="dark:text-white" onClick={handleFilter}>
            Filter
          </button>
        </form>
      </div>
      <div>
        <div className="flex justify-center mb-3 ">
          <p className="bg-gray-300  hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
            PAGE:{page}
          </p>
        </div>
        <div className="flex justify-center ">
          <button
            class="bg-gray-300   hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l  prev "
            onClick={handlePrev}
          >
            Prev
          </button>
          <button
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
      <div className="flex justify-center flex-wrap">
        {loading ? (
          <div className="flex justify-center items-center">
            <div
              className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          movies.map((movie) => <MovieCard key={movie.id} {...movie} />)
        )}
      </div>
      <div>
        <div className="flex justify-center mb-3 ">
          <p className="bg-gray-300  hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ">
            PAGE:{page}
          </p>
        </div>
        <div className="flex justify-center ">
          <button
            class="bg-gray-300  hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            onClick={handlePrev}
          >
            Prev
          </button>
          <button
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
