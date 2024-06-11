export const myInfo = async (token: string | undefined) => {
  const url = "http://localhost:8000/api";
  const path = "/users/me";
  try {
    const res = await fetch(`${url}${path}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error(err);
  }
};
