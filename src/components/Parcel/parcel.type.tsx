import { Parcel as BaseParcelFormData } from '@prisma/client';

export type ParcelFormData = Omit<
  BaseParcelFormData,
  'id' | 'info' | 'sender' | 'recipient'
> & {
  info: {
    weight: string;
    height: string;
    width: string;
    length: string;
    price: string;
  }[];
} & Record<
    'sender' | 'recipient',
    {
      name: string;
      address: string;
      contactNumber: string;
    }
  >;
