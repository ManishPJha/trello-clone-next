import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ObjectId } from "mongodb";

import { authSelector } from "@/src/slices/auth";
import { boardSelector } from "@/src/slices/board";
import {
  updateColumn,
  columnsSelector,
  fetchColumnsByBoardId,
} from "@/src/slices/column";

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

type ColumnTypes = {
  _id: ObjectId;
  columnId: string;
  boardId: string;
  name: string;
  sequence: number;
};

const Index: NextPage = (props) => {
  const auth = useSelector(authSelector);
  const board = useSelector(boardSelector);
  const columns = useSelector(columnsSelector);

  // console.log(`cl props`, columns);
  const dispatch = useDispatch();

  // console.log(`board---->`, board, "\nauth---->", auth, "\nprops---->", props);

  const updateSequences = async (
    source: SourceType,
    destination: DestinationType,
    draggableId: string,
    type: string
  ) => {
    try {
      const newSequence = {
        oldIndex: source.index,
        newIndex: destination.index,
      };

      const oldSequenceId: ColumnTypes = columns.filter(
        (x: any) => Number(x.sequence - 1) === source.index
      )[0];

      const newSequenceId: ColumnTypes = columns.filter(
        (x: any) => Number(x.sequence - 1) === destination.index
      )[0];

      // console.log(
      //   `sequence ----->`,
      //   oldSequenceId.columnId,
      //   newSequenceId.columnId
      // );
      // dispatch new sequences here... (TODO)
      const response = await dispatch<any>(
        updateColumn({
          id: oldSequenceId.columnId,
          destinationId: newSequenceId.columnId,
          sequence: newSequence,
        })
      );
      if (!response.error) {
        return true;
      }
      return false;
    } catch (error: any) {
      console.log(`>>>ERROR:`, error.message);
    }
  };

  const onDragEndHandler: any = async (props: any) => {
    const { draggableId, source, destination, type }: OnDragEndHandlerProps =
      props;

    const response = await updateSequences(
      source,
      destination,
      draggableId,
      type
    );

    if (response) {
      await dispatch<any>(fetchColumnsByBoardId({ id: board.boardId }));
    }
  };
  console.log(props);

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
