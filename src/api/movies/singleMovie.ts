export const getSingleMovie = async (id: number) => {
  const url = `http://127.0.0.1:8000/api/movies/${id}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch movie data");
    }
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching movie data:", error);
    throw error;
  }
};
