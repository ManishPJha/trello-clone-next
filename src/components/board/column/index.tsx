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
import {
  Draggable,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";

interface ColumnProps {
  column: any;
  ind: any;
  setName: any;
  setColumnId: any;
  name: string;
}

interface HandlerProps {
  draggableProps: DraggableProvidedDragHandleProps;
  columnId: string;
  columnName: string;
  setName: any;
  setColumnId: any;
  name: string;
}

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

const Column = ({ column, ind, setName, setColumnId, name }: ColumnProps) => {
  return (
    <HStack direction={"column"}>
      <Draggable draggableId={column._id} index={ind}>
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
              gap={4}
              bg={column.name === "Add Column" ? "#F0F0F0" : "#F0F0F0"}
              // pb={5}
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
                  {/* <MenuItem>
                    <Text>Edit</Text>
                  </MenuItem> */}
                  <MenuItem>
                    <DeleteIcon />
                    <Text ml={2}>Delete</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Box>
        )}
      </Draggable>
    </HStack>
  );
};

export default Column;
