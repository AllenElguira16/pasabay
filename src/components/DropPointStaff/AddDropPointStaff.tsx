import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Select,
  ModalFooter,
} from '@chakra-ui/react';
import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { trpc } from '~/utils';

type UserFormData = User & {
  confirmPassword: string;
};

export function AddDropPointStaff() {
  const { data: branchQuery } = trpc.branch.getBranches.useQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit: handleSubmitWrapper } =
    useForm<UserFormData>();

  // TODO: submit data to backend
  const handleSubmit = handleSubmitWrapper((data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  });

  if (!branchQuery) return null;

  return (
    <>
      <Button onClick={onOpen}>Add Staff</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit}>
          <ModalHeader>Add Drop Point Staff</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacing={2}>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input {...register('firstName')} />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input {...register('lastName')} />
              </FormControl>
              <FormControl>
                <FormLabel>Drop Point Area</FormLabel>
                <Select placeholder="Choose Branch" {...register('branchID')}>
                  {branchQuery.branches.map(({ id, ...branch }) => (
                    <option value={id} key={id}>
                      {branch.street}, {branch.city}, {branch.province},{' '}
                      {branch.zipCode}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input {...register('email')} />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" {...register('password')} />
              </FormControl>
              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input type="password" {...register('confirmPassword')} />
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
