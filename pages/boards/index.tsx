import React from "react";
import Boards from "@/src/components/boards";
import { withAuth } from "@/src/hoc/withAuth";
import WithBoardsTemplate from "@/src/hoc/with-boards-template";
import { NextPage } from "next";

const withAuthBoards: NextPage = withAuth(Boards);
const withBoardsLayout = WithBoardsTemplate(withAuthBoards);

export default withBoardsLayout;
