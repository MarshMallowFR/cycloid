import { isFruit, flatten } from "@/utils/tools";
import {
  fakeFruits,
  fakeFruit,
  fakeFruitsFlatten,
} from "@/utils/tests/fruits.fixtures";

describe("Tools", () => {
  it("flatten function", () => {
    expect(flatten(fakeFruits)).toStrictEqual(fakeFruitsFlatten);
  });
  it("isFruit function", () => {
    const dataToTest = [
      {
        data: {
          ...fakeFruit,
        },
        expected: true,
      },
      {
        data: {
          ...fakeFruit,
          isFruit: false,
        },
        expected: false,
      },
      {
        data: {
          isFruit: true,
        },
        expected: false,
      },
      {
        data: {
          ...fakeFruit,
          toto: {
            isFruit: true,
          },
        },
        expected: false,
      },
      {
        data: {},
        expected: false,
      },
      {
        data: [],
        expected: false,
      },
    ];
    for (const { data, expected } of dataToTest) {
      expect(isFruit(data)).toBe(expected);
    }
  });
});
