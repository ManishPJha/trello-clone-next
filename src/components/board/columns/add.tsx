import { Box, Button } from "@chakra-ui/react";
import React from "react";

type ColumnProps = {
  addColumn: () => void;
  columnRequest: boolean;
};

const AddColumn = ({ addColumn, columnRequest }: ColumnProps) => {
  return (
    <Box
      rounded="lg"
      height="auto"
      width="272px"
      display="flex"
      flexDirection="column"
      mt="10px"
      mx="10px"
    >
      <Button
        size="xs"
        my="10px"
        mx="5px"
        backgroundColor="primary"
        color="black"
        onClick={addColumn}
        isLoading={columnRequest}
        disabled={columnRequest}
        loadingText="Adding column"
      >
        + Add a Column
      </Button>
    </Box>
  );
};

export default AddColumn;
