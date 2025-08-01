import { SetUserData } from "../Request/SetUserData";
import type { User } from "../Request/SetUserData";

export const handleSignup = async (formData: User): Promise<User> => {
  try {
    const result = await SetUserData(formData);


    const existingUsers = JSON.parse(localStorage.getItem("dijavo_users") || "[]");


    const filteredUser = {
      email: result.email,
      password: result.password,
      username: result.username
    };

    const updatedUsers = [...existingUsers, filteredUser];

    localStorage.setItem("dijavo_users", JSON.stringify(updatedUsers));

    return result;
  } catch (error: unknown) {
    console.error("Signup error:", error);
    throw error;
  }
};
