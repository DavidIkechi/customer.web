export const formatDate = (date) => {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("default", { month: "short" });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const output = `${day}/${month}/${year}`;
  return output;
};
