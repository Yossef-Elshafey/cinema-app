import React from "react";
import { useGetMovies } from "../api/useFetchMovies";
import Navbar from "../component/Navbar";

function Home() {
  const { movies, loading } = useGetMovies();
  console.log(movies);

  return (
    <div className="relative h-screen">
      <Navbar />
      {loading && <div className="text-white">Loading ...</div>}
    </div>
  );
}

export default Home;
