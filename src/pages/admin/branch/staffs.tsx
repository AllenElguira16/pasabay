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
  AddDropPointStaff,
  DeleteDropPointStaff,
  EditDropPointStaff,
} from '~/components';

export default function Users() {
  const { data: staffQuery } = trpc.branch.getStaffs.useQuery();

  if (!staffQuery) return null;

  return (
    <AdminLayout>
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="2xl">Staff</Text>
        <AddDropPointStaff />
      </Flex>
      <Divider my="4" />
      <Card>
        <CardBody>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Admin</Th>
                  <Th>E-mail</Th>
                  <Th>Drop-point areas</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {staffQuery.staffs.map(({ id, branch, ...staff }, index) => (
                  <Tr key={id}>
                    <Td>{index + 1}</Td>
                    <Td>
                      {staff.firstName} {staff.lastName}
                    </Td>
                    <Td>{staff.email}</Td>
                    <Td>
                      {branch.street}, {branch.city}, {branch.province},{' '}
                      {branch.zipCode}
                    </Td>
                    <Td display="flex" gap="2">
                      {/* TODO: add a way to disable action if item is admin and user types is staff */}
                      <EditDropPointStaff {...staff} />
                      <DeleteDropPointStaff id={id} />
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
