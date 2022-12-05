// this file will be used to fetch the current user from local storage
export const fetchCurrentUser = async () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  return currentUser;
};
