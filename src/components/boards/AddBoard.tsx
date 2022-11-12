import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

type boardsProps = {
  onClose: () => void;
  isOpen: boolean;
  boardName: string;
  setBoardName: Function;
  handleSubmit: () => void;
};

const AddBoard: React.FC<boardsProps> = (props: boardsProps) => {
  const { isOpen, onClose, boardName, setBoardName, handleSubmit } = props;

  return (
    // <Box>
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={true}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as={"h4"}>Add Board</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Board name</FormLabel>
            <Input
              type={"text"}
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            ></Input>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <FormControl>
            <Button onClick={handleSubmit}>Submit</Button>
          </FormControl>
        </ModalFooter>
      </ModalContent>
    </Modal>
    // </Box>
  );
};

export default AddBoard;
