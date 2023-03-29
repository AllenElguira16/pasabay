import { DeleteIcon } from '@chakra-ui/icons';
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from '@chakra-ui/react';
import { FormEventHandler } from 'react';

export function DeleteDropPointArea({ id }: { id: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO: submit data to backend
  const handleSubmit: FormEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(id);
  };

  return (
    <>
      <Button background="red.400" color="white" onClick={onOpen}>
        <DeleteIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit}>
          <ModalHeader>Add Drop Point Area</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="2xl">Are you sure you want to delete?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Submit
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
