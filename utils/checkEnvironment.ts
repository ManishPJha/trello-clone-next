export const checkEnvironment = () => {
  let BASE_URI =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://trello-clone-next-gamma.vercel.app";
  return BASE_URI;
};
