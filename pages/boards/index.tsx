import React from "react";
import Boards from "@/src/components/boards";
import { withAuth } from "@/src/hoc/withAuth";

const boards = withAuth(Boards);

export default boards;
