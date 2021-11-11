import { FruitFetched } from "@/pages/fruits/fruit.type";

const fruitEnum: Record<string, string> = {
  isFruit: "isFruit",
  name: "name",
  image: "image",
  price: "price",
  color: "color",
  description: "description",
  taste: "taste",
  expires: "expires",
  id: "id",
};

export const isFruit = (data: any): boolean => {
  if (data instanceof Array || !data) {
    return false;
  }
  const keys: string[] = Object.keys(data);
  const isFruit: boolean = keys.every((key: string) => fruitEnum[key]);
  if (isFruit && keys.length > 1 && data["isFruit"]) {
    return true;
  }
  return false;
};

const traverseAndFlatten = (currentNode: any, fruits: FruitFetched[]) => {
  if (isFruit(currentNode)) {
    fruits.push(currentNode);
  }
  for (const key in currentNode) {
    const value = currentNode[key];
    if (typeof value === "object") {
      traverseAndFlatten(value, fruits);
    }
  }
};

export const flatten = (obj: any) => {
  const fruits: FruitFetched[] = [];
  traverseAndFlatten(obj, fruits);
  return fruits;
};
