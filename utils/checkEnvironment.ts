export const checkEnvironment = () => {
  let BASE_URI =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "http://localhost:7000";
  return BASE_URI;
};
