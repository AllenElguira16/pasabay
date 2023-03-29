import { PrismaClient } from '@prisma/client';
import { procedure, router } from '~/rpc';

const prisma = new PrismaClient();

export const parcelRouter = router({
  getParcels: procedure().query(async () => {
    const parcels = await prisma.parcel.findMany({
      include: {
        branch: true,
        tracker: true,
      },
    });

    return {
      status: true,
      parcels,
    };
  }),
});
