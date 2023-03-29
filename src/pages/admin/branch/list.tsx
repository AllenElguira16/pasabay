import {
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
import { trpc } from '~/utils';
import {
  AddDropPointArea,
  DeleteDropPointArea,
  EditDropPointArea,
} from '~/components';

export default function Users() {
  const { data: branchQuery } = trpc.branch.getBranches.useQuery();

  if (!branchQuery) return null;

  return (
    <AdminLayout>
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="2xl">Areas</Text>
        <AddDropPointArea />
      </Flex>
      <Divider my="4" />
      <Card>
        <CardBody>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Branch Code</Th>
                  <Th>Address</Th>
                  <Th>Country</Th>
                  <Th>Contact No.</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {branchQuery.branches.map(({ id, ...branch }, index) => (
                  <Tr key={id}>
                    <Td>{index + 1}</Td>
                    <Td>{branch.branchCode}</Td>
                    <Td>
                      {branch.street}, {branch.city}, {branch.province},{' '}
                      {branch.zipCode}
                    </Td>
                    <Td>{branch.contactNumber}</Td>
                    <Td>{branch.city}</Td>
                    <Td display="flex" gap="2">
                      <EditDropPointArea {...branch} />
                      <DeleteDropPointArea id={id} />
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
