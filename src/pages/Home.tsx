import React, { useState } from "react";
import { useGetMovies } from "../api/useFetchMovies";
import GlassyBox from "../component/GlassyBox";
import Navbar from "../component/Navbar";

function Home() {
  const { movies, loading, setPage } = useGetMovies();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      // currentIndex is going out of range
      if (nextIndex === movies?.results.length) {
        // check if there next values
        if (movies?.next) {
          // get the values of the next page
          setPage((prev) => prev + 1);
          return 0; // prepare currentIndex to start again
        } else {
          return prev;
        }
      }
      return nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const prevIndex = prev - 1;
      if (prevIndex < 0) {
        if (movies?.previous) {
          setPage((prevPage) => prevPage - 1);
          return movies?.results.length - 1; // Set index to the last movie of the previous page
        } else {
          return 0;
        }
      }
      return prevIndex;
    });
  };

  return (
    <div className="relative h-screen">
      <Navbar />
      <GlassyBox
        loading={loading}
        display={movies?.results[currentIndex]}
        forward={handleNext}
        previous={handlePrev}
      />
    </div>
  );
}

export default Home;
