import { Prisma } from '@prisma/client';

export const senderRecipientTransformer = (json: Prisma.JsonValue) => {
  return json as {
    name: string;
    address: string;
    contactNumber: string;
  };
};
