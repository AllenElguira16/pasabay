import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { generateReferenceNumber } from '~/utils';

const prisma = new PrismaClient();

(async () => {
  await prisma.$connect();

  await prisma.user.deleteMany();

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash('12345678', salt);

  const branch = await prisma.branch.create({
    data: {
      branchCode: nanoid(),
      street: 'Branch 1 St., Quiapo',
      city: 'Manila',
      province: 'Metro Manila',
      zipCode: '1001',
      contactNumber: '+2 123 455 623',
      dateCreated: new Date(),
    },
  });

  const parcel = await prisma.parcel.create({
    data: {
      referenceNumber: generateReferenceNumber(),
      sender: {
        name: 'John Smith',
        address: 'Sample',
        contactNumber: '+123456',
      },
      recipient: {
        name: 'Claire Blake',
        address: 'Sample',
        contactNumber: '+123456',
      },
      deliveryType: 'DELIVERY',
      branchID: branch.id,
      info: {
        weight: '30kg',
        height: '12in',
        width: '12in',
        length: '15in',
        price: '2500',
      },
    },
  });

  await prisma.parcelTracker.create({
    data: {
      parcelID: parcel.id,
      status: 'ACCEPTED',
    },
  });

  await prisma.user.create({
    data: {
      firstName: 'Administrator',
      lastName: '',
      email: 'admin@admin.com',
      password,
      type: 'ADMIN',
      branchID: branch.id,
    },
  });

  await prisma.$disconnect();
})();
