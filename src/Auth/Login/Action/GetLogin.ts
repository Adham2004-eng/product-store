import type { User } from "../../Signup/Request/SetUserData";

export const handleLogin = async (
  formData: Pick<User, "email" | "password">
): Promise<User | null> => {
  try {

    const existingUsers: User[] = JSON.parse(
      localStorage.getItem("dijavo_users") || "[]"
    );


    const matchedUser = existingUsers.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (matchedUser) {
      localStorage.setItem("dijavo_current_user", JSON.stringify(matchedUser));
      return matchedUser;
    }


    return null;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
export const getLoggedInUser = () => {
  const user = localStorage.getItem("loggedInUser");
  return user ? JSON.parse(user) : null;
};

