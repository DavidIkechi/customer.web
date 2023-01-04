export const localStorageUser = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};
