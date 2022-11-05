import React from "react";

import Home from "@/src/components/Home";
import { withAuth } from "@/src/hoc/withAuth";

const homeWithAuth = withAuth(Home);

export default homeWithAuth;
