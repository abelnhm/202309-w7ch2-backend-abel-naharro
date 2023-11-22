import { Offer } from './offers';

export type LoginUser = {
  email: string;
  passwd: string;
};

export type User = LoginUser & {
  id: string;
  name: string;
  surname: string;
  age: number;
  offers: Offer[]; // Relacionar con ofertas (relación entre clases)
};
