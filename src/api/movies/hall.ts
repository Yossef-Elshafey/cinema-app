export const getHalls = async (token: string | undefined) => {
  const res = await fetch("http://localhost:8000/api/hall", {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return await res.json();
  }
};
