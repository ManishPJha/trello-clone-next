import React from "react";

import Home from "@/src/components/Home";
import { withAuth } from "@/src/hoc/withAuth";
import { NextPage } from "next";

const HomeWithAuth: NextPage = withAuth(Home);

export default HomeWithAuth;
