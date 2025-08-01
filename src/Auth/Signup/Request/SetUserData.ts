export interface User {
  email: string;
  username: string;
  password: string;
}

export const SetUserData = async (user: User): Promise<User> => {
  await fetch("https://fakestoreapi.com/users", {
    method: "POST",
    body: JSON.stringify(user),
  });

  return user; 
};
