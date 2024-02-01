import { Invoice } from '../../src/invoice/entities/invoice.entity';

export const invoiceDataset: Invoice[] = [
  new Invoice({
    id: 1,
    price: 6.78,
    ride_id: 1,
    created_at: new Date('2024-01-31 15:09:57.891779'),
  }),
  new Invoice({
    id: 2,
    price: 4.64,
    ride_id: 3,
    created_at: new Date('2024-01-31 15:09:57.894507'),
  }),
  new Invoice({
    id: 3,
    price: 6.87,
    ride_id: 5,
    created_at: new Date('2024-01-31 15:09:57.897185'),
  }),
];
