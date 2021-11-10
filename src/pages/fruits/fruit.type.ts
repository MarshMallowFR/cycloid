export type FruitFetched = {
  isFruit: boolean;
  id: number;
  color: string;
} & Fruit;

export type Fruit = {
  name: string;
  image: string;
  price: string;
  color: { hex: string };
  description: string;
  taste: string;
  expires: string;
};
