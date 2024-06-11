import { SigninData, SignUpRes } from "../../types/Types";
export const signIn = async (payload: SigninData) => {
  const url = "http://127.0.0.1:8000/api/users/sign-in";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const status = res.status;
  const data = (await res.json()) as SignUpRes;
  return { status, data };
};
