import { SignupData, SignUpRes } from "../../types/Types";

export const createAdmin = async (
  payload: SignupData,
  token: string | undefined,
) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/users/sign-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token} `,
      },
      body: JSON.stringify(payload),
    });
    const status = res.status as number;
    const data = (await res.json()) as SignUpRes;
    return { status, data };
  } catch (err: any) {
    console.error(err);
  }
};
