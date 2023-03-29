import { PrismaClient } from '@prisma/client';
import { procedure, router } from '~/rpc';

const prisma = new PrismaClient();

export const branchRouter = router({
  getBranches: procedure().query(async () => {
    return {
      status: true,
      branches: await prisma.branch.findMany(),
    };
  }),
  getStaffs: procedure().query(async () => {
    return {
      status: true,
      staffs: await prisma.user.findMany({
        include: {
          branch: true,
        },
      }),
    };
  }),
});
