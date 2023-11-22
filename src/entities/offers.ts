import { User } from './user';

export type Offer = {
  id: string;
  title: string;
  image: string;
  description: string;
  author: User; // Relacionar con usuarios (relación entre clases)
  price: number;
  discount: number;
  isActive: boolean;
  dateEnd: number;
};
