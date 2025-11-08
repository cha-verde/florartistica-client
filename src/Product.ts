export interface Product  {
    id: number;
    name: string;
    photo: string[];
    price: { digital: number; physical: number };
  };