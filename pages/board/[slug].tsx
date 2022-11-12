import React from "react";
import Board from "@/src/components/board";
import { withAuth } from "@/src/hoc/withAuth";
import withBoardTemplate from "@/src/hoc/with-board-template";

const WithAuth = withAuth(Board);
const WithBoardTemplate = withBoardTemplate(WithAuth);

export default WithBoardTemplate;
