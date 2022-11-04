import React from "react";

import Home from "@/src/components/Home";
import { withAuth } from "@/src/hoc/withAuth";
// import withStore from "@/src/hoc/withStore";

const homeWithAuth = withAuth(Home);
// const homeWithStore: NextPage = withStore(homeWithAuth);

export default homeWithAuth;
