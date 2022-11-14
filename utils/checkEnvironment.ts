export const checkEnvironment = () => {
  let BASE_URI =
    process.env.NODE_ENV === "development"
      ? process.env.BASE_URL!
      : process.env.LIVE_URL!;
  return BASE_URI;
};
