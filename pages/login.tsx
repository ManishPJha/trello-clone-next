import Login from "@/src/components/Login";
import { Wrapper } from "@/src/store";

const LoginPage = Login;

LoginPage.getInitialProps = async (ctx) => {
  // const { getState } = await ctx;
  console.log(`init----->`, process.env.NODE_ENV);

  return {};
};

export default LoginPage;
