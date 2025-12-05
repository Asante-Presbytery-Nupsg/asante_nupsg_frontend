import type { MultiStepUserFormInput } from "@/schema/userSchema";
import { BASE_API } from "./base";

export const registerUser = async (data: MultiStepUserFormInput) => {
  try {
    const response = await BASE_API.post("/auth/register", data);

    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
  }
};
