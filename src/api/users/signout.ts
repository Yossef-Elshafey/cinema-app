export const signout = async (token: string | undefined) => {
  const url = "http://localhost:8000/api";
  const path = "/users/sign-out";
  const res = await fetch(`${url}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return res.status;
};
