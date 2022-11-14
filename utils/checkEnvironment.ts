export const checkEnvironment = () => {
  let BASE_URI =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.VERCEL_URL?.toString()!;
  return BASE_URI;
};
