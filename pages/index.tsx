import type { NextPage } from "next";
import checkEnvironments from "../utils/checkEnvironments";

const Home: NextPage = (props) => {
  // console.log("1", props);

  return (
    <>
      <p>fsf</p>
    </>
  );
};

export default Home;

// Home.getInitialProps = async () => {
//   const apiData = await (
//     await fetch(checkEnvironments().concat("/api/hello"))
//   ).json();
//   return {
//     data: apiData,
//   };
// };
