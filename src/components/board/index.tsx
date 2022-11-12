import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";

import { authSelector } from "@/src/slices/auth";
import { boardSelector } from "@/src/slices/board";

import Columns from "@/src/components/board/columns";

type SourceType = {
  droppableId: string;
  index: number;
};

type DestinationType = SourceType;

type OnDragEndHandlerProps = {
  draggableId: string;
  source: SourceType;
  destination: DestinationType;
  type: string;
};

const Index: NextPage = (props) => {
  const auth = useSelector(authSelector);
  const board = useSelector(boardSelector);

  // console.log(`board---->`, board, "\nauth---->", auth, "\nprops---->", props);

  const updateSequences = (
    source: SourceType,
    destination: DestinationType
  ) => {
    try {
      const newSequence = {
        oldIndex: source.index,
        newIndex: destination.index,
      };

      // dispatch new sequences here... (TODO)
    } catch (error: any) {
      console.log(`>>>ERROR:`, error.message);
    }
  };

  const onDragEndHandler: any = (props: any) => {
    const { draggableId, source, destination, type }: OnDragEndHandlerProps =
      props;

    updateSequences(source, destination);
  };

  return (
    <Box backgroundImage={`url(${board.backgroundImage})`}>
      <Columns
        auth={auth}
        board={board}
        onDragEndHandler={(props) => onDragEndHandler(props)}
      />
    </Box>
  );
};

export default Index;
