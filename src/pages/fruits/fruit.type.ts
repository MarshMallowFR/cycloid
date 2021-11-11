export type CommonFruit = {
  name: string;
  image: string;
  price: string;
  description: string;
  taste: string;
  expires: string;
};
export type FruitFetched = {
  isFruit: boolean;
  id: number;
  color: string;
} & CommonFruit;

export type FruitEdit = {
  color: { hex: string };
} & CommonFruit;
