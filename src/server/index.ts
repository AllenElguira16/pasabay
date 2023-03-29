import { router } from '~/rpc';
import { branchRouter } from './branch';
import { parcelRouter } from './parcel';
import { userRouter } from './user';

export const appRouter = router({
  user: userRouter,
  branch: branchRouter,
  parcel: parcelRouter,
});

export type AppRouter = typeof appRouter;
