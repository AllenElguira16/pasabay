import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Branch as BranchFormData } from '@prisma/client';

export function AddDropPointArea() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit: handleSubmitWrapper } =
    useForm<BranchFormData>();

  // TODO: submit data to backend
  const handleSubmit = handleSubmitWrapper((data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  });

  return (
    <>
      <Button onClick={onOpen}>Add Drop Point Area</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit}>
          <ModalHeader>Add Drop Point Area</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacing={2}>
              <FormControl>
                <FormLabel>Street/Building</FormLabel>
                <Input {...register('street')} />
              </FormControl>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input {...register('city')} />
              </FormControl>
              <FormControl>
                <FormLabel>Province</FormLabel>
                <Input {...register('province')} />
              </FormControl>
              <FormControl>
                <FormLabel>Zip Code/Postal Code</FormLabel>
                <Input {...register('zipCode')} />
              </FormControl>
              <FormControl>
                <FormLabel>Contact No.</FormLabel>
                <Input {...register('contactNumber')} />
              </FormControl>
            </SimpleGrid>
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
