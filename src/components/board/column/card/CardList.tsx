import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

import { CardListProps } from "@/src/types/IBoardTypes";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Stack,
  HStack,
  Box,
} from "@chakra-ui/react";
import { FaPencilAlt } from "react-icons/fa";

import { CardTypes } from "@/src/types/IBoardTypes";

type DraggableComponentProps = CardTypes & {
  index: number;
};

const DraggableCardComponent: FC<DraggableComponentProps> = ({
  _id,
  cardId,
  name,
  index,
}: DraggableComponentProps) => {
  return (
    <Draggable draggableId={cardId} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          background={"white"}
          border={"1px solid #ddd"}
          mt={2}
        >
          <HStack direction={'row'} borderBottom={'0.1px solid #000'}>
            <CardHeader
              {...provided.dragHandleProps}
              _hover={{
                cursor: "pointer",
              }}
            >
              {name}
            </CardHeader>
            <FaPencilAlt />
          </HStack>
          <CardBody></CardBody>
          <CardFooter></CardFooter>
        </Card>
      )}
    </Draggable>
  );
};

const CardList: FC<CardListProps> = ({ cards, dropRef }: CardListProps) => {
  return (
    <Box ref={dropRef}>
      <Stack direction={"column"}>
        {cards &&
          cards.length > 0 &&
          cards.map((card, index) => {
            return (
              <DraggableCardComponent {...card} index={index} key={index} />
            );
          })}
      </Stack>
    </Box>
  );
};

export default CardList;
