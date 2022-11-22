import React, { FC, Fragment, useState } from "react";
import {
  Box,
  Heading,
  HStack,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import { DragHandleIcon, DeleteIcon } from "@chakra-ui/icons";
import { AiOutlineMore } from "react-icons/ai";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import shortid from "shortid";

import AddCard from "@/src/components/board/column/card/AddCard";
import CardList from "@/src/components/board/column/card/CardList";

import { _ColumnProps, HandlerProps } from "@/src/types/IBoardTypes";

import {
  addCard as addCardRequest,
  fetchCardsWithBoardId,
} from "@/src/slices/cards";

const LoadTitleWithDragHandler: FC<HandlerProps> = ({
  draggableProps,
  columnId,
  columnName,
  setName,
  setColumnId,
  name,
}: HandlerProps) => {
  let title = "";

  // setter
  const setTitle = (newTitle: string) => {
    title = newTitle;
  };

  // getter
  const getTitle = () => {
    return title;
  };

  return (
    <Fragment>
      <Heading
        {...draggableProps}
        as={"h6"}
        size="sm"
        ml="10px"
        // mt="5px"
        textAlign="center"
        _hover={{
          cursor: "pointer",
        }}
      >
        <DragHandleIcon />
      </Heading>
      <Editable
        defaultValue={columnName}
        onChange={(newTitle) => setTitle(newTitle)}
        onFocus={() => console.log("active")}
        onBlur={() => {
          const title = getTitle();
          if (title && title !== undefined && title !== null) {
            setName(title);
            setColumnId(columnId);
            return;
          }
        }}
        onKeyDown={(key) => {
          if (key.code === "Tab" || key.code === "Enter") {
            const title = getTitle();
            if (title && title !== undefined && title !== null) {
              setName(title);
              setColumnId(columnId);
              return;
            }
          }
        }}
      >
        <EditablePreview></EditablePreview>
        <EditableInput></EditableInput>
      </Editable>
    </Fragment>
  );
};

const Column = ({
  column,
  cards,
  ind,
  setName,
  setColumnId,
  name,
}: _ColumnProps) => {
  const [cardName, setCardName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { boardId, filteredWithBoardId } = column;
  const { _id } = filteredWithBoardId;

  const dispatch = useDispatch();

  const filteredCards =
    cards && cards.filter((card) => card.innerColumnData._id === column._id);

  const addCard = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      let cardId = shortid.generate();

      if (cardId) {
        const isCardAdded = await dispatch<any>(
          addCardRequest({
            id: cardId,
            columnId: column._id,
            boardId: _id,
            name: cardName || "Edit Name"
          })
        );

        if (isCardAdded) {
          // do success stuff
          setIsLoading(false);
          dispatch<any>(fetchCardsWithBoardId({ id: String(boardId) }));
        }
      }
    } catch (error: any) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  return (
    <HStack direction={"column"}>
      <Draggable draggableId={String(column._id)} index={ind}>
        {(provided) => (
          <Box
            width="272px"
            height="calc(100vh - 90px)"
            overflowY="auto"
            mt="10px"
            mx="10px"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <HStack
              gap={12}
              bg={column.name === "Add Column" ? "#F0F0F0" : "#F0F0F0"}
            >
              {LoadTitleWithDragHandler({
                draggableProps: provided.dragHandleProps!,
                columnId: column.columnId,
                columnName: column.name,
                setName: setName,
                setColumnId: setColumnId,
                name: name,
              })}
              <Menu>
                <MenuButton
                  as={Button}
                  background={"transparent"}
                  _hover={{
                    background: "transparent",
                  }}
                  _active={{
                    background: "transparent",
                  }}
                  rightIcon={<AiOutlineMore />}
                ></MenuButton>
                <MenuList>
                  <MenuItem>
                    <DeleteIcon />
                    <Text ml={2}>Delete</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>

            {/* Card Component Begin */}
            <Droppable droppableId={String(column._id)} type="cards">
              {(provided) => (
                <Fragment>
                  <CardList
                    cards={filteredCards}
                    dropRef={provided.innerRef}
                    {...provided.droppableProps}
                  />
                  {provided.placeholder}
                </Fragment>
              )}
            </Droppable>

            <AddCard
              setName={setCardName}
              name={cardName}
              addCard={addCard}
              column={column}
            />
            {/* Card Component End */}
          </Box>
        )}
      </Draggable>
    </HStack>
  );
};

export default Column;
