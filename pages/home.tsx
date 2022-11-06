import React from "react";

import Home from "@/src/components/Home";
import { withAuth } from "@/src/hoc/withAuth";
import { Wrapper } from "@/src/store"
import { NextPage } from "next";

const HomeWithAuth: NextPage = withAuth(Home);

// HomeWithAuth.getInitialProps = Wrapper.getInitialPageProps(({ dispatch }) => async () => {
//     // await dispatch()
// })

export default HomeWithAuth;
