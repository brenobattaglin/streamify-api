import { ValueObject } from "./value-object";

class StringValueObject extends ValueObject {
  constructor(private readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(
    private readonly value1: string,
    private readonly value2: number,
  ) {
    super();
  }
}

describe("value object unit tests", () => {
  describe("when objects are compared", () => {
    test("should return true for equal value objects", () => {
      const valueObject1 = new StringValueObject("test");
      const valueObject2 = new StringValueObject("test");

      expect(valueObject1.equals(valueObject2)).toBe(true);

      const complexValueObject1 = new ComplexValueObject("test", 1);
      const complexValueObject2 = new ComplexValueObject("test", 1);

      expect(complexValueObject1.equals(complexValueObject2)).toBe(true);
    });

    test("should return false for different value objects", () => {
      const valueObject1 = new StringValueObject("test");
      const valueObject2 = new StringValueObject("test2");

      expect(valueObject1.equals(valueObject2)).toBe(false);
      expect(valueObject1.equals(null as any)).toBe(false);
      expect(valueObject1.equals(undefined as any)).toBe(false);
      expect(valueObject2.equals(null as any)).toBe(false);
      expect(valueObject2.equals(undefined as any)).toBe(false);

      const complexValueObject1 = new ComplexValueObject("test", 1);
      const complexValueObject2 = new ComplexValueObject("test", 2);

      expect(complexValueObject1.equals(complexValueObject2)).toBe(false);
      expect(complexValueObject1.equals(null as any)).toBe(false);
      expect(complexValueObject1.equals(undefined as any)).toBe(false);
      expect(complexValueObject2.equals(null as any)).toBe(false);
      expect(complexValueObject2.equals(undefined as any)).toBe(false);
    });
  });
});
