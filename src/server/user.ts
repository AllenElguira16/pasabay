import { procedure, router } from '~/rpc';
import { editSchema, signInSchema, signUpSchema } from '~/schema';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const userRouter = router({
  getUser: procedure().query(async ({ ctx }) => {
    if (!ctx.session.user)
      return {
        status: false,
        message: 'A User is already logged in',
      };

    return {
      status: true,
      user: ctx.session.user,
    };
  }),
  register: procedure()
    .input(signUpSchema)
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user)
        return {
          status: false,
          message: 'A User is already logged in',
        };

      const salt = await bcrypt.genSalt(10);

      const user = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          gender: input.gender,
          address: input.address,
          password: await bcrypt.hash(input.password, salt),
          role: 'user',
        },
      });

      ctx.session.user = user;
      await ctx.session.save();

      return {
        user,
        status: true,
        message: 'Sign Up Successful!',
      };
    }),
  login: procedure()
    .input(signInSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        if (ctx.session.user)
          return {
            status: false,
            message: 'A User is already logged in',
          };

        const user = await prisma.user.findFirstOrThrow({
          where: { email: input.email },
        });

        if (!(await bcrypt.compare(input.password, user.password))) {
          return {
            status: false,
            message: 'password incorrect',
          };
        }

        ctx.session.user = user;
        await ctx.session.save();
        return {
          user,
          status: true,
          message: 'Sign In Successful!',
        };
      } catch (error) {
        return {
          status: false,
          message: 'User does not exists',
        };
      }
    }),
  logout: procedure(true).mutation(async ({ ctx }) => {
    ctx.session.destroy();
    return {
      status: true,
    };
  }),
  getAll: procedure().query(async () => {
    return prisma.user.findMany({
      select: {
        name: true,
        email: true,
        gender: true,
        address: true,
        createdAt: true,
      },
    });
  }),
  edit: procedure(true)
    .input(editSchema)
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session.user)
        return {
          status: false,
          message: 'You have no access, please login first',
        };

      const count = await prisma.user.count({
        where: {
          email: input.email,
          NOT: {
            id: input.id,
          },
        },
      });

      if (count === 1)
        return {
          status: false,
          message: 'User already exists',
        };

      const salt = await bcrypt.genSalt(10);

      const user = await prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          email: input.email,
          gender: input.gender,
          address: input.address,
          password: await bcrypt.hash(input.password, salt),
          role: 'user',
        },
      });

      ctx.session.user = user;
      await ctx.session.save();

      return {
        status: true,
        message: 'Edit Successful!',
      };
    }),
});
