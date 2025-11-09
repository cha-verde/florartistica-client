export interface Product {
  id: number;
  name: string;
  photo: string[];
  price: {
    digital: number;
    a5: number;
    a4: number;
    a3: number;
    a2: number;
    a1: number;
    a0: number;
    size5x7: number;
    size8x10: number;
    size11x14: number;
    size12x18: number;
    size16x20: number;
    size18x24: number;
    size24x36: number;
  };
}
