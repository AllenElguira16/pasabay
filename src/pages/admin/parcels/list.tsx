import {
  Badge,
  Card,
  CardBody,
  Divider,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { AdminLayout } from '~/layouts';
import { senderRecipientTransformer, trpc } from '~/utils';
import { AddParcel, DeleteParcel, EditParcel } from '~/components';

export default function Users() {
  const { data: parcelQuery } = trpc.parcel.getParcels.useQuery();

  if (!parcelQuery) return null;

  return (
    <AdminLayout>
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="2xl">Areas</Text>
        <AddParcel />
      </Flex>
      <Divider my="4" />
      <Card>
        <CardBody>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Reference Number</Th>
                  <Th>Sender Name</Th>
                  <Th>Recipient Name</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {parcelQuery.parcels.map(({ id, ...parcel }, index) => (
                  <Tr key={id}>
                    <Td>{index + 1}</Td>
                    <Td>{parcel.referenceNumber}</Td>
                    <Td>{senderRecipientTransformer(parcel.sender).name}</Td>
                    <Td>{senderRecipientTransformer(parcel.recipient).name}</Td>
                    <Td>
                      <Badge>{parcel.tracker?.status}</Badge>
                    </Td>
                    <Td display="flex" gap="2">
                      <EditParcel {...parcel} />
                      <DeleteParcel id={id} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </AdminLayout>
  );
}
