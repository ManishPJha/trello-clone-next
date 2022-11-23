import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Button, useDisclosure, Box, Text, HStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import shortid from "shortid";
import { NextRouter } from "next/router";

import AddBoard from "@/src/components/boards/AddBoard";
import { createBoard, fetchBoards, boardsSelector } from "@/src/slices/board";

interface boardsTypes {
  boards: Array<any>;
  setBoards: () => void;
}

interface propTypes {
  props: any;
  router: NextRouter;
}

const Index: NextPage<propTypes> = ({ props, router }: propTypes) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [boardName, setBoardName] = useState("");
  const [boards, setBoards]: any = useState<Array<boardsTypes>>([]);

  const dispatch: any = useDispatch();
  const boardsState = useSelector(boardsSelector);

  const handleSubmit = async () => {
    if (boardName) {
      const id = shortid.generate();

      const data = {
        id: id,
        name: boardName,
      };

      const board = await dispatch(createBoard(data));

      if (board) {
        // do success stuff
        dispatch(fetchBoards());
      }

      setBoardName("");
      onClose();
    }
  };

  const handleRedirect = (board: any) => {
    if (board && board.boardId) {
      router.push("/board/" + board.boardId);
    }
  };

  useEffect(() => {
    console.log(`>>>>>>>>>>states>>>>>>>>`, boardsState);
    setBoards(boardsState);
  }, [boardsState]);

  return (
    <Box margin={5}>
      <Button onClick={onOpen} leftIcon={<AddIcon />}>
        Add Board
      </Button>
      {isOpen && (
        <AddBoard
          boardName={boardName}
          isOpen={isOpen}
          onClose={onClose}
          setBoardName={setBoardName}
          handleSubmit={handleSubmit}
        />
      )}

      <HStack gap={4} mt="1rem" minWidth="50vw" display="flex" flexWrap="wrap">
        {boards &&
          boards.map((board: any, index: any) => (
            <Box
              key={index}
              mr="1rem"
              mt="1rem"
              height="150px"
              width="150px"
              background={`linear-gradient(
              rgba(0, 0, 0, 0.4),
              rgba(0, 0, 0, 0.4)
            ),
            url(${board.backgroundImage})`}
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              borderRadius="5px"
              boxShadow="lg"
              cursor="pointer"
              onClick={() => handleRedirect(board)}
            >
              <Text
                marginTop="calc(50% - 25px)"
                height="25px"
                textAlign="center"
                textTransform="capitalize"
                color="white"
                fontSize="20px"
                fontWeight="bold"
              >
                {board.boardName}
              </Text>
            </Box>
          ))}
      </HStack>
    </Box>
  );
};

export default Index;
