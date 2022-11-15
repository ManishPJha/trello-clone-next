export const checkEnvironment = () => {
  let BASE_URI =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://trello-clone-app.onrender.com";
  return BASE_URI;
};
