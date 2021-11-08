import { flatten } from "@/utils/tools";
import { Fruit } from "@/pages/fruits/fruit.type";

const url = "http://localhost:3000";

export const getAllFruits = async (): Promise<Fruit[]> => {
  const data = await fetch(`${url}/fruit`).then((res: Response) => res.json());
  const fruits = flatten(data);
  return fruits;
};

export const getFruit = async (fruitId: number): Promise<Fruit> => {
  return fetch(`${url}/fruit/${fruitId}`).then((res: Response) => res.json());
};

export const removeFruit = async (fruitId: number): Promise<Response> => {
  return fetch(`${url}/fruit/${fruitId}`, {
    method: "DELETE",
  });
};

export const createFruit = async (fruit: Fruit): Promise<Fruit> => {
  return fetch(`${url}/fruit`, {
    method: "POST",
    body: JSON.stringify(fruit),
  }).then((res: Response) => res.json());
};
