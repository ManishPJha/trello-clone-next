import React, { useState } from "react";
import { Button, Stack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

import { cardsSelector } from "@/src/slices/cards";

import { ColumnTypes } from "@/src/types/IBoardTypes";

type CardProps = {
  name?: string;
  setName?: (name: string) => void;
  addCard: (event: React.MouseEvent<HTMLElement>) => void;
  column?: ColumnTypes;
};

const AddCard: React.FC<CardProps> = ({
  // name,
  // setName,
  // column,
  addCard,
}: CardProps) => {
  const { loading, cards } = useSelector(cardsSelector);

  return (
    <Stack>
      <Button
        gap={4}
        leftIcon={<AddIcon />}
        onClick={addCard}
        isLoading={loading}
        isDisabled={loading}
      >
        Add Card
      </Button>
    </Stack>
  );
};

export default AddCard;
