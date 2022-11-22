import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ObjectId } from "mongodb";

import { authSelector } from "@/src/slices/auth";
import { boardSelector } from "@/src/slices/board";
import {
  updateColumn,
  columnsSelector,
  fetchColumnsByBoardId,
} from "@/src/slices/column";
import {
  cardsSelector,
  fetchCardsWithBoardId,
  updateCardSequence,
} from "@/src/slices/cards";

import {
  SourceType,
  DestinationType,
  OnDragEndHandlerProps,
  CardTypes,
} from "@/src/types/IBoardTypes";

// Components
import Columns from "@/src/components/board/columns";

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
  const cards = useSelector(cardsSelector);

  // console.log(`cl props`, columns);
  const dispatch = useDispatch();

  // console.log(`board---->`, board, "\nauth---->", auth, "\nprops---->", props);
  // console.log(`board---->`, cards);

  const updateSequences = async (
    source: SourceType,
    destination: DestinationType,
    draggableId: string,
    type: string
  ) => {
    try {
      // do nothing if no destination found
      if (!destination) {
        return;
      }

      // do nothing is destination is source itself
      if (destination.index === source.index) {
        return;
      }

      const saveColumnSequences = async () => {
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

        // dispatch new sequences...
        const response = await dispatch<any>(
          updateColumn({
            id: oldSequenceId.columnId, //source id
            destinationId: newSequenceId.columnId,
            sequence: newSequence,
          })
        );
        if (!response.error) {
          return true;
        }
        return false;
      };

      const saveCardSequences = async () => {
        console.log(`source-----`, source, `\n`);
        console.log(`destination-----`, destination, `\n`);
        console.log(`draggableId-----`, draggableId, `\n`);
        console.log(`type-----`, type, `\n`);

        const sourceCard = {
          columnId: source.droppableId,
          index: source.index,
        };

        const destinationCard = {
          columnId: destination.droppableId,
          index: destination.index,
        };

        const destColumnId: any = destination.droppableId;

        const filterDestCardId: any = cards.cards.filter(
          (card: CardTypes) => card.innerColumnData._id === destColumnId
        )[0];

        const isUpdated = await dispatch<any>(
          updateCardSequence({
            cardId: draggableId,
            destCardId: filterDestCardId.cardId,
            sourceCard,
            destinationCard,
          })
        );

        if (isUpdated) {
          console.log(`cl side `, isUpdated);
        }
      };

      // const oldSequenceId =

      if (type === "column") {
        return await saveColumnSequences();
      }

      if (type === "cards") {
        return await saveCardSequences();
      }
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
      await dispatch<any>(fetchCardsWithBoardId({ id: board.boardId }));
      window.location.reload();
    }
  };

  return (
    <Box backgroundImage={`url(${board.backgroundImage})`}>
      {/* Columns Component */}
      <Columns
        auth={auth}
        board={board}
        onDragEndHandler={(props) => onDragEndHandler(props)}
      />
    </Box>
  );
};

export default Index;
