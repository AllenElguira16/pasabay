import { CloseIcon, EditIcon } from '@chakra-ui/icons';
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
  ModalFooter,
  Divider,
  Select,
  Box,
  TableContainer,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  Flex,
} from '@chakra-ui/react';
import { useFieldArray, useForm } from 'react-hook-form';
import { trpc } from '~/utils';
import { Parcel } from '@prisma/client';
import { ParcelFormData } from './parcel.type';

export function EditParcel({ ...defaultValues }: Omit<Parcel, 'id'>) {
  const { data: branchesQuery } = trpc.branch.getBranches.useQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    watch,
    control,
    handleSubmit: handleSubmitWrapper,
  } = useForm<ParcelFormData>({
    defaultValues: defaultValues as ParcelFormData,
  });

  const { append, remove } = useFieldArray({ control, name: 'info' });

  // TODO: submit data to backend
  const handleSubmit = handleSubmitWrapper((data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  });

  const handleAddItem = () => {
    append({
      weight: '',
      height: '',
      length: '',
      width: '',
      price: '',
    });
  };

  const handleRemoveItem = (id: number) => {
    remove(id);
  };

  if (!branchesQuery) return null;

  return (
    <>
      <Button background="blue.600" color="white" onClick={onOpen}>
        <EditIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit}>
          <ModalHeader>Edit Parcel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacing={2}>
              <FormControl>
                <FormLabel>Sender Name</FormLabel>
                <Input {...register('sender.name')} />
              </FormControl>
              <FormControl>
                <FormLabel>Recipient Name</FormLabel>
                <Input {...register('recipient.name')} />
              </FormControl>
              <FormControl>
                <FormLabel>Sender Address</FormLabel>
                <Input {...register('sender.address')} />
              </FormControl>
              <FormControl>
                <FormLabel>Recipient Address</FormLabel>
                <Input {...register('recipient.address')} />
              </FormControl>
              <FormControl>
                <FormLabel>Sender Contact Number</FormLabel>
                <Input {...register('sender.contactNumber')} />
              </FormControl>
              <FormControl>
                <FormLabel>Recipient Contact Number</FormLabel>
                <Input {...register('recipient.contactNumber')} />
              </FormControl>
            </SimpleGrid>
            <Divider my="6" />
            <SimpleGrid columns={2} spacing={2}>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Select
                  {...register('deliveryType')}
                  placeholder="Choose Delivery Type"
                >
                  <option value="DELIVERY">Delivery</option>
                  <option value="PICK_UP">Pickup</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Drop Point Area</FormLabel>
                <Select {...register('branchID')} placeholder="Choose Branch">
                  {branchesQuery.branches.map(({ id, ...branch }) => (
                    <option value={id} key={id}>
                      {branch.street}, {branch.city}, {branch.province},{' '}
                      {branch.zipCode}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </SimpleGrid>
            <Divider my="6" />
            <Box>
              <Flex alignItems="center" justifyContent="space-between">
                <FormLabel>Drop Point Area</FormLabel>
                <Button onClick={handleAddItem}>Add Item</Button>
              </Flex>
              <TableContainer>
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Weight</Th>
                      <Th>Height</Th>
                      <Th>Length</Th>
                      <Th>Width</Th>
                      <Th>Price</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {watch('info').map((_, index) => (
                      <Tr key={`${index.toString()}`}>
                        <Td>
                          <Input {...register(`info.${index}.weight`)} />
                        </Td>
                        <Td>
                          <Input {...register(`info.${index}.height`)} />
                        </Td>
                        <Td>
                          <Input {...register(`info.${index}.length`)} />
                        </Td>
                        <Td>
                          <Input {...register(`info.${index}.width`)} />
                        </Td>
                        <Td>
                          <Input {...register(`info.${index}.price`)} />
                        </Td>
                        <Td>
                          <Button onClick={() => handleRemoveItem(index)}>
                            <CloseIcon />
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                    <Tr>
                      <Td colSpan={4} textAlign="right">
                        Total
                      </Td>
                      <Td>
                        {watch('info').reduce(
                          (acc, prev) => acc + (Number(prev.price) || 0),
                          0,
                        )}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
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
