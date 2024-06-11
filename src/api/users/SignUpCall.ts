import { SignupData, SignUpRes } from "../../types/Types";

export const signupCall = async (payload: SignupData) => {
  const url = "http://127.0.0.1:8000/api/users/sign-up";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const status = res.status as number;
    const data = (await res.json()) as SignUpRes;
    return { status, data };
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};
