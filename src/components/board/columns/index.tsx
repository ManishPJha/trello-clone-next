import { Box } from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import shortId from "shortid";

import {
  addColumn as addColumnAction,
  updateColumn,
  columnSelector,
  columnsSelector,
  fetchColumnsByBoardId,
} from "@/src/slices/column";
import { cardsSelector } from "@/src/slices/cards";

import AddColumn from "@/src/components/board/columns/add";
import Column from "@/src/components/board/column";

import { ColumnProps } from "@/src/types/IBoardTypes";

const Columns = ({ onDragEndHandler, board, auth }: ColumnProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [columnsList, setColumnsList] = useState<Array<any>>([]);
  const [name, setName] = useState("");
  const [columnId, setColumnId] = useState("");

  // const column = useSelector(columnSelector);
  const columns = useSelector(columnsSelector);
  const cards = useSelector(cardsSelector).cards;

  const dispatch = useDispatch();

  const addColumn = async () => {
    let id = shortId.generate();
    setIsSuccess(true);
    const column = await dispatch<any>(addColumnAction({ id: id }));

    if (column) {
      await dispatch<any>(fetchColumnsByBoardId({ id: board.boardId }));
      setIsSuccess(false);
    }
  };

  useEffect(() => {
    if (columns && columns.length > 0) {
      setColumnsList(columns);
    }
  }, [columns]);

  useEffect(() => {
    if (name) {
      // dispatch update new title action
      const updateColumnWithName = async (columnId: string, name: string) => {
        const isUpdated = await dispatch<any>(
          updateColumn({
            id: columnId,
            name: name,
          })
        );

        if (!isUpdated.error) {
          // No need to fetch columns as it's a draggable component it'll keep the changes
          // await dispatch<any>(fetchColumns());
        }

        return;
      };
      updateColumnWithName(columnId, name);
    }
  }, [dispatch, name, columnId]);

  return (
    <Box
      display="block"
      position="relative"
      height="calc(100vh - 0px)"
      overflowX="auto"
    >
      <DragDropContext onDragEnd={onDragEndHandler}>
        <Droppable
          droppableId="dropperMain"
          direction="horizontal"
          type="column"
        >
          {(provider) => {
            return (
              <Fragment>
                <Box
                  ref={provider.innerRef}
                  {...provider.droppableProps}
                  display="flex"
                  position="absolute"
                  overflowY="auto"
                >
                  {/* Columns List*/}
                  {columnsList &&
                    columnsList.map((column, index) => (
                      <Column
                        key={index}
                        column={column}
                        cards={cards}
                        ind={index}
                        setName={(title: string) => setName(title)}
                        setColumnId={(id: string) => setColumnId(id)}
                        name={name}
                      />
                    ))}
                  {provider.placeholder}

                  {/* Add Column Component */}
                  <AddColumn addColumn={addColumn} columnRequest={isSuccess} />
                </Box>
              </Fragment>
            );
          }}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default Columns;
