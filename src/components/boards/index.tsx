import { NextPage } from "next";
import React from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Column from "./column";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Boards: NextPage<any> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const [ open, setOpen ] = useState(false);

  const onEnd = () => {};

  return (
    <Box
      display="block"
      position="relative"
      height="calc(100vh - 90px)"
      overflowX="auto"
    >
      {/* <DragDropContext onDragEnd={onEnd}>
        <Droppable
          droppableId="all-doppables"
          direction="vertical"
          type="column"
        >
          {(provided) => (
            <Box
              ref={provided.innerRef}
              display="flex"
              position="absolute"
              overflowY="auto"
              {...provided.droppableProps}
            ></Box>
          )}
        </Droppable>
      </DragDropContext> */}
      <Button
        color={useColorModeValue("gray.900", "gray.400")}
        rightIcon={<PlusSquareIcon />}
        onClick={onOpen}
      >
        Add Board
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} onOverlayClick={onClose}>
        <Box position={"relative"}>
          <ModalHeader></ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button>Submit</Button>
          </ModalFooter>
        </Box>
      </Modal>
    </Box>
  );
};

export default Boards;
