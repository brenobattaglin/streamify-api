import { InvalidUuidError, Uuid } from "./uuid.vo";
import { validate as uuidValidate } from "uuid";

describe("uuid unit tests", () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, "validate");

  it("should create valid uuid", () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeTruthy();
    expect(uuidValidate(uuid.id)).toBe(true);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should create a uuid with a given ID", () => {
    const id = "123e4567-e89b-12d3-a456-426614174000";
    const uuid = new Uuid(id);
    expect(uuid.id).toBe(id);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if uuid is invalid", () => {
    expect(() => new Uuid("invalid-uuid")).toThrowError(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
